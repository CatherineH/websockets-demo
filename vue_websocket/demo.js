import VueNativeSock from 'vue-native-websocket';
Vue.use(VueNativeSock, 'ws://localhost:9090');

var app = new Vue({
    el: '#app',
    data: {
        num_blocks: num_blocks,
        block_size: block_size,
        total_width: total_width * 2 + "px",
        total_height: total_width + "px",
        blocks: locations,
        times: {starts:[0, 0], ends:[0, 0]},
        test: 0
    },
    mounted: function () {
        var app_handle = this;
        var port = '8765';
        const socket = new WebSocket('ws://localhost:8080');

        // Connection opened
        socket.addEventListener('open', function (event) {
            socket.send('Hello Server!');
            app_handle.times.starts[0] = new Date().getTime();
        });
        var current_block = 0;
        // Listen for messages
        socket.addEventListener('message', function (event) {
            app_handle.blocks[0][current_block].fill = event.data;
            current_block += 1;
            if (current_block >= app_handle.blocks[0].length) {
                app_handle.times.ends[0] = new Date().getTime();
                current_block = 0;
            }
        });
        var blocks_set = 0;
        this.times.starts[1] = new Date().getTime();
        for(var i=0; i<app_handle.blocks[1].length; i++){
            this.$http.get('http://localhost:8000', {params:{'current_index': i}}).then((response) => {
                // get body data
                app_handle.blocks[1][blocks_set].fill= response.body;
                if(blocks_set == app_handle.blocks[1].length-1){
                    app_handle.times.ends[1] = new Date().getTime();
                }
                blocks_set += 1;

              }, response => {
                // error callback
              });
        }
    }
});