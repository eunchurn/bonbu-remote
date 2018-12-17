const lirc_node = require('lirc_node')
const express = require('express');
const app = express();
const redis = require('redis');
require('dotenv').load({
    path: '.env'
});
const chalk = require('chalk');
client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

lirc_node.init();
console.log(lirc_node.remotes);

app.get('/', function (req, res) {
    res.send('hello Bonbu deZentral');
});

app.get('/api/switchOn', (req, res) => {
    lirc_node.irsend.send_once('bonbu-remote', 'KEY_POWER', () => {
        console.log(`${(new Date()).toISOString()}  | ${chalk.green('✓')} switch ON`);
        client.set('update', (new Date()).getTime());
        client.set('power', 1);
        res.send('on');

    })
});

app.get('/api/switchOff', (req, res) => {
    lirc_node.irsend.send_once('bonbu-remote', 'KEY_POWER', () => {
        console.log(`${(new Date()).toISOString()}  | ${chalk.red('✗')} switch OFF`)
        client.set('update', (new Date()).getTime());
        client.set('power', 0);
        res.send('off');
    })
});

app.get('/api/switchStatus', (req, res) => {
    client.get('power', (err, reply) => {
        res.send(reply)
    })
})


app.listen(8080);



// const listenerId = lirc_node.addListener((data) => {
//     console.log(`Received ${data.key} from remote ${data.remote}`);
//     if (data.remote == 'bonbu-remote') {
//         lirc_node.irsend.send_once('bonbu-remote', data.key);
//         console.log(`Sending ${data.key} to remote Bonbu`);
//     }
// });

// setInterval(() => {
//     // console.log(`Sending ${data.key} to remote Bonbu`);
//     lirc_node.irsend.send_once('bonbu-remote', 'KEY_POWER', () => {
//         console.log("Sent bonbu-remote power command!");
//     });
// },2000)