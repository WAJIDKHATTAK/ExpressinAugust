const express = require('express');
const http = require('http');
const { EventEmitter } = require('events');
const path = require('path'); // Import the path module

const app = express();
const server = http.createServer(app);

const notificationEmitter = new EventEmitter();

// Middleware to parse JSON body
app.use(express.json());

// Generate New Notification
app.post('/new-notification', (req, res) => {
    const notificationData = req.body;

    notificationEmitter.emit('newNotification', notificationData);
    res.send('Notification created ...');
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    notificationEmitter.on('newNotification', (notificationData) => {
        socket.emit('notification', notificationData);
    });
});

// Serve the client.html file
app.get('/client.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});

server.listen(3000, () => {
    console.log('Server is running on Port : 3000 =)');
});
