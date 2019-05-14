var locations = [[], []];

var num_blocks = 20;
var block_size = 20;
var total_width = block_size * num_blocks;
var colors = [];
var total_blocks = num_blocks * num_blocks;
for (var i = 0; i < total_blocks; i++) {
    colors.push("rgb(0, 0, 0)");
}

var direction_left = true;
var current_column = [0, 0];

for (var i = 0; i < colors.length; i++) {
    locations[0].push({
        x: current_column[0] * block_size,
        y: current_column[1] * block_size,
        fill: colors[i]
    });
    locations[1].push({
        x: current_column[0] * block_size + total_blocks,
        y: current_column[1] * block_size,
        fill: colors[i]
    });
    var next_pixel = direction_left ? [current_column[0] + 1, current_column[1] - 1] : [current_column[0] - 1, current_column[1] + 1];
    if (next_pixel[0] < 0 || next_pixel[1] < 0) {
        next_pixel = direction_left ? [current_column[0] + 1, current_column[1]] : [current_column[0], current_column[1] + 1];
        direction_left = !direction_left;
    }
    if (next_pixel[0] >= num_blocks) {
        next_pixel = [next_pixel[0] - 1, next_pixel[1] + 2];
        // if it was going left at the time, it needs to switch to right
        direction_left = false;
    }
    if (next_pixel[1] >= num_blocks) {
        next_pixel = next_pixel[0] != 0 ? [next_pixel[0] + 2, next_pixel[1] - 1] : [next_pixel[0] + 1, next_pixel[1] - 1];
        direction_left = true;
    }
    current_column = next_pixel
}
