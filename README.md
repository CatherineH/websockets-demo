# websockets-demo

- chrome has max 6 connections per host name
- due to the async nature of responses, you can end up with your info out of order on http, but not with websockets
- even with 6 connections open, ws is still faster (using express) there may be faster http servers out there, but
there is a lot more overhead per connection (make a graph)
- investigate cpu usage
- implement sockets.io
- implement vue-native-websockets
- microsoft edge is really slow? like 16-17 seconds compared to 0.5-1 second in chrome/firefox (it was due to the SVG renderer being slow, not websockets)

# outline
- what are websockets
- demo vs http
- speed tests
- resource usage
- vue-native-websockets (simple and with vuex)
- sockets.io?
