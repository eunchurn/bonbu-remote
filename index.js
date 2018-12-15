const lirc_node = require('lirc_node')

lirc_node.init();
lirc_node.addListener((data) => {
    console.log(`Received ${data.key} from remote ${data.remote}`);
    setInterval(() => {
        console.log(`Sending ${data.key} to remote Bonbu`);
        lirc_node.irsend.send_once('bonbu-remote', data.key);
    },2000)
    if (data.remote == 'bonbu-remote') {
        lirc_node.irsend.send_once('bonbu-remote', data.key);
        console.log(`Sending ${data.key} to remote Bonbu`);
    }
});

