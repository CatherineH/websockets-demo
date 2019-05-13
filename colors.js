var base_COLORS = [[92,  6, 179], [218,  0, 99], [140, 236,  0], [255, 239,  0]];
var COLORS = [];

var num_blocks = 20;
var total_blocks = num_blocks*num_blocks;
var num_gradients = total_blocks/base_COLORS.length;
var rgb_index = [...Array(3).keys()];

for(i=0; i < base_COLORS.length; i++){
    var difference = rgb_index.map((item, j) => base_COLORS[(i+1) % base_COLORS.length][j]-base_COLORS[i][j]);
    for(let j=0; j<num_gradients; j++){
        COLORS.push(rgb_index.map(k =>base_COLORS[i][k] + difference[k]*j/num_gradients));
    }
}
module.exports = {
    COLORS: COLORS
};