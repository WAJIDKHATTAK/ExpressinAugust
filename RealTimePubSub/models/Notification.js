const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    sender: String,
    reciever: String,
    message: String
});

module.exports = mongoose.model('Notification' , notificationSchema);