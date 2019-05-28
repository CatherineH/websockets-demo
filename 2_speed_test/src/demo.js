
import Vue from 'vue';
import Plotly from 'plotly.js';
import VueResource from 'vue-resource';
Vue.use(VueResource);

var app = new Vue({
    el: '#app',
    data: {
        times: {websockets: [], http: []},
        test: 0,
        num_tests: 50
    },
    methods:{
        getWebsocket: function(){
            var app_handle = this;
            var port = '8765';
            const socket = new WebSocket('ws://localhost:8080');
            var start_time = new Date().getTime();
            // Connection opened
            socket.addEventListener('open', function (event) {
                socket.send('Hello Server!');
            });
            // Listen for messages
            socket.addEventListener('message', function (event) {
                if(event.data == 'end')
                {
                    app_handle.times.websockets.push(new Date().getTime() - start_time);
                    if (app_handle.times.websockets.length > app_handle.num_tests) {
                        app_handle.updatePlot();
                        app_handle.getHttp();
                    } else {
                        app_handle.getWebsocket();
                    }
                }

            });
        },
        getHttp: function(){
            var app_handle = this;
            var blocks_set = 0;
            var start_time = new Date().getTime();
            for(var i=0; i<400; i++){
                this.$http.get('http://localhost:8000', {params:{'current_index': i}}).then((response) => {
                    // get body data
                    blocks_set += 1;

                    if (app_handle.times.http.length < app_handle.num_tests && blocks_set == 400) {
                        app_handle.times.http.push(new Date().getTime() - start_time);
                        app_handle.getHttp();
                    } else if(blocks_set == 400){
                        this.updatePlot();
                    }

                  }, response => {
                    // error callback
                });
            }
        },
        updatePlot: function(){
            var trace1 = {
              x: this.times.websockets,
              type: "histogram",
              name: 'websockets return time',
              opacity: 0.5,
              marker: {
                 color: 'red',
              },
            };
            var trace2 = {
              x: this.times.http,
              type: "histogram",
              name: 'HTTP return time',
              opacity: 0.6,
              marker: {
                 color: 'green',
              },
            };

            var data = [trace1, trace2];
            var layout = {barmode: "overlay",
                xaxis: {title: "return time (ms)"},
                yaxis: {title: "Count"}
            };
            Plotly.newPlot("times-plot", data, layout);
        }
    },
    mounted: function () {
        this.getWebsocket();

    }
});

