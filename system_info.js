const si = require('systeminformation');

// promises style - new since version 3
si.currentLoad()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// promises style - new since version 3
si.mem()
    .then(data => console.log(data))
    .catch(error => console.error(error));