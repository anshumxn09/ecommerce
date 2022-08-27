const Users = require('../models/userModel');

const adminAuth = async (req, res, next) => {
    try {
        // fetching the user information by using user ID.
        const user = await Users.findOne({
            _id: req.user.id,
        })
        if(user.role === 0) return res.status(400).json({message:"Admin resources access denied."})

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}   

module.exports = adminAuth;