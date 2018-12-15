const lirc_node = require('lirc_node')

lirc_node.init();
lirc_node.addListener((data) => {
    console.log(`Received ${data.key} from remote ${data.remote}`);
    if (data.remote == 'bonbu-remote') {
        lirc_node.irsend.send_once('bonbu-remote', data.key);
        console.log(`Sending ${data.key} to remote Bonbu`);
    }
});

setInterval(() => {
    lirc_node.irsend.send_once('bonbu-remote', 'KEY_POWER');
},2000)