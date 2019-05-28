var app = require('../../1_frames_demo/src/demo.js');
var Reveal = require('reveal.js');
import hljs from 'highlight.js';

var $ = require('jQuery');

Reveal.initialize({
                /*// More info https://github.com/hakimel/reveal.js#dependencies
                dependencies: [
                    { src: 'dist/highlight.js', async: true },
                ]*/
            });

hljs.initHighlightingOnLoad();
var header = $('#header').html();
if ( window.location.search.match( /print-pdf/gi ) ) {
    $('.slides > section').prepend(header);
}
else {
    $('.slides').prepend(header);
}
