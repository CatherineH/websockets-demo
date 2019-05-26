var app = require('../../1_frames_demo/src/demo.js');
var Reveal = require('reveal.js');
var $ = require('jQuery');

Reveal.initialize({
                // More info https://github.com/hakimel/reveal.js#dependencies
                /*dependencies: [
                    { src: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.6.0/plugin/highlight/highlight.min.js', async: true },
                ]*/
            });



var header = $('#header').html();
if ( window.location.search.match( /print-pdf/gi ) ) {
    $('.slides > section').prepend(header);
}
else {
    $('.slides').prepend(header);
}
