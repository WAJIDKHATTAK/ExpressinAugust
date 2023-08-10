const express = require('express')
const http = require('http');
const {EventEmitter} = require('events');

const app = express();
const server = http.createServer(app);

const notificationEmitter = new EventEmitter();
const realtime = () => {
//Gnerate New Notification
app.post('/new-notification' , (req ,res) => {
   const notificationData = req.body;

   notificationEmitter.emit('newNotification' , notificationData)
   res.send('Notification created ...')
});

const io = require('socket.io')(server);
io.on('connection' , (socket) => {
    notificationEmitter.on('newNotification', (notificationData) => {
        socket.emit('notification' , notificationData)
    });
});

server.listen(3000 , () => {
    console.log('server is running on Port : 3000 =)')
})
}

module.exports = realtime