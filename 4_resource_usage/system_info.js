const http = require('http');
const fs = require('fs');
const si = require('systeminformation');
const WebSocket = require('ws');
var express = require('express');

var samples = [];
var start_time = new Date().getTime();
var global_start_time = start_time;
// get http data for 3 minutes, then websockets data for 3 minutes
var test_time = 1000*60*3;

function httpRequest(){
    http.get({
      hostname: 'localhost',
      port: 8000,
      path: '/?current_index=40',
      agent: false  // Create a new agent just for this one request
    }, (res) => {
      if(new Date().getTime() - start_time<test_time){
          httpRequest();
      } else {
          console.log("http tests done");
          start_time = new Date().getTime();
          websocketsRequest();
      }
    });
}


function websocketsRequest(){
    const ws = new WebSocket('ws://localhost:8080');

    ws.on('open', function open() {
      ws.send('something');
    });

    ws.on('message', function incoming(data) {

        if(data == "end"){
            if(new Date().getTime() - start_time<test_time){
                websocketsRequest();
                ws.close();
            } else {
                console.log("tests done");
            }
        }
});
}

function getSample(){
    si.processes().then(data => {
        var processes = {};
        data.list.forEach(item => {
            if(item.command.includes(" node_")) {
                processes[item.command] = {'user': item.pcpuu, 'system': item.pcpus, 'mem': item.pmem, 'cpu': parseFloat(item.pcpus)+parseFloat(item.pcpuu)};
            }
        });
        // only append the process info
        processes.time = new Date().getTime()-global_start_time;
        if(samples.length == 0) {
            samples.push(processes);
        } else {
            var is_different = false;
            for(var process in processes){
                if(process == 'time') {
                    continue
                }
                for(var component in processes[process]){
                    if(processes[process][component] != samples[samples.length-1][process][component]){
                        samples.push(processes);
                        is_different = true;
                        break
                    }
                }
                if(is_different){
                    break
                }
            }
        }
        if(new Date().getTime() - global_start_time<2*test_time){
            getSample();
        } else {
            console.log("tests done");
        }
    })
        .catch(error => console.error(error));
}
httpRequest();
getSample();
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', function (req, res) {
  res.send(samples);
});

app.listen(8081);


