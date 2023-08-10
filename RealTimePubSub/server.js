const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const socketIO = require('socket.io');
const eventEmitter = require('./eventEmitter');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// MongoDB connection
const connect = async () => {
    try{
await mongoose.connect('mongodb://127.0.0.1:27017/realtimechat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log('Connection to database succesful')}
catch(error){
    console.log({
        message : error.message
    })
}
}
connect()


// ...

// Routes
const subscribeController = require('./controllers/subscribeController');
const publishController = require('./controllers/publishController');

app.use(bodyParser.json());

app.post('/subscribe', subscribeController);
app.post('/publish', publishController);

app.get('/client.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'client.html'));
});

io.on('connection', (socket) => {
    const notificationView = require('./views/notificationView');
    notificationView(socket);
});

server.listen(3000, () => {
    console.log('Server is running on Port : 3000');
});
