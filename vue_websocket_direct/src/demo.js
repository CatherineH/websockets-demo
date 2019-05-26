import Vue from 'vue';
import VueResource from 'vue-resource';
import VueNativeSock from 'vue-native-websocket';
var grid = require('../../src/initialize_grid.js');

Vue.use(VueNativeSock, 'ws://localhost:8080');
Vue.use(VueResource);
console.log('grid: ', grid.locations);

var app = new Vue({
    el: '#app',
    data: {
        num_blocks: grid.num_blocks,
        block_size: grid.block_size,
        total_width: grid.total_width * 2 + "px",
        total_height: grid.total_width + "px",
        blocks: grid.locations,
        test: 0
    },
    mounted: function () {
        var app_handle = this;
        var port = '8765';
        var current_block = 0;
        this.$socket.addEventListener('message', function (event) {
            app_handle.blocks[0][current_block].fill = event.data;
            current_block += 1;
            if (current_block >= app_handle.blocks[0].length) {
                current_block = 0;
            }
        });

        var blocks_set = 0;
        for(var i=0; i<app_handle.blocks[1].length; i++){
            this.$http.get('http://localhost:8000', {params:{'current_index': i}}).then((response) => {
                // get body data
                app_handle.blocks[1][blocks_set].fill= response.body;
                blocks_set += 1;

              }, response => {
                // error callback
              });
        }
    }
});
