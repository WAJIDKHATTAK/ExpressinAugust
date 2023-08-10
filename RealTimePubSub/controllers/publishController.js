const Notification = require('../models/Notification');
const eventEmitter = require('../eventEmitter');

const publishController = async (req, res) => {
    const { sender, receiver, message } = req.body;
    const notification = new Notification({ sender, receiver, message });
    await notification.save();
    eventEmitter.emit('newNotification', { sender, receiver, message });
    res.json({ message: 'Notification published' });
};

module.exports = publishController;
