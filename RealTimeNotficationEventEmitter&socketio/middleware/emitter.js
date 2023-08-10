const express = require('express');
const {EventEmitter} = require('events');

const app = express();
const eventEmitter = new EventEmitter();
const eventmiddleware = () => {
app.use((req ,res , next) => {
    try {
    console.log(`Request path : ${req.path}`);
    eventEmitter.emit('requestLogged' , req.path);
    next();
    }catch (error){
        console.log({
            message : error.message
        })
        res.status(message)
    }
});

app.get('/' , (req , res) => {
 res.send('Hello Express');
});

eventEmitter.on('requestLogged' , (path) => {
    console.log(`Request Logged : ${path}`)
})

app.listen(3000 , ()=> {
    console.log('Server is running on port 3000');
});
}

module.exports = eventmiddleware