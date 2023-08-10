const eventEmitter = require('../eventEmitter');

module.exports = (socket) => {
    eventEmitter.on('newNotification', (notificationData) => {
        socket.emit('notification', notificationData);
    });
};
