const nodeLIRC = require('node-lirc');

nodeLIRC.init();

nodeLIRC.on('stdout', (event) => {
	console.log(event.instructions);
	if (event.eventName == 'EVENT_BUTTON_NAME')
		nodeLIRC.writeLine('VOLUME_UP');
});