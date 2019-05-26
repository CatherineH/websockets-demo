import Vue from 'vue';
import VuePlotly from '@statnett/vue-plotly';


var app = new Vue({
    components: VuePlotly,
    el: '#app',
    websocket_plot: {x: this.times.websockets, type: 'histogram'},
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
                    }

                  }, response => {
                    // error callback
                });
            }
        }
    },
    mounted: function () {
        this.getWebsocket();

    }
});

