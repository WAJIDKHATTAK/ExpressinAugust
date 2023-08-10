const User = require('../models/User')
 
const subscribeController = async (req ,res) => {
    try {
       const {username} = req.body;
       const user = new User({username});
       await user.save();
    res.json({message : 'Subscribed Successfully'})
    }catch (error){
        console.log({
            message : error.message
        })
        res.status(message)
    }
}
module.exports = subscribeController;