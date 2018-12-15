const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyAMA0', {
    baudRate: 9600
})

port.on('error', function (err) {
    console.log('Error: ', err.message)
})

port.on('open', function () {
    // open logic
})

port.on('data', function (data) {
    console.log('Data:', data)
})