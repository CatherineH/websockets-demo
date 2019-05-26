
/*import Vue from 'vue';
import VuePlotly from '@statnett/vue-plotly';
import VueResource from 'vue-resource';*/
Vue.use(VueResource);

new Vue({
    el: '#app',
    data: {
        samples: []
    },
    methods:{
        getHttp: function(){
            var app_handle = this;
            this.$http.get('http://localhost:8081', {}).then((response) => {
                    this.samples = response.data;
                    this.updatePlot("mem");
                    this.updatePlot("user");
                    this.updatePlot("system");
                    this.updatePlot("cpu");
                }, response => {
                    // error callback
                });
        },
        updatePlot: function(of_interest){
            var by_key = {};
            var x_values = [];
            this.samples.forEach(item => {
                for(var key in item){
                    if(key == "time"){
                        x_values.push(item[key]);
                    } else {
                        if(typeof by_key[key] == "undefined"){
                            by_key[key] = [item[key][of_interest]];
                        } else {
                            by_key[key].push(item[key][of_interest]);
                        }
                    }
                }
            });
            var data = [];
            var colors = ["green", "red"];
            // normalize x_values
            var x_values_normalized = [];
            x_values.forEach(item => x_values_normalized.push((item-x_values[0])/(1000*60)));
            for(var key in by_key) {
                data.push({
                    x: x_values_normalized,
                    y: by_key[key],
                    name: key,
                    marker: {
                        color: colors.pop(),
                    },
                })
            }

            var layout = {
                xaxis: {title: "time (minutes)"},
                yaxis: {title: of_interest}
            };
            Plotly.newPlot("resource-plot-"+of_interest, data, layout);
        }
    },
    mounted: function () {
        this.getHttp();
    }
});

