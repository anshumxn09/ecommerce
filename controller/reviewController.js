const Review = require('../models/reviewModel');
const Users = require('../models/userModel');

const reviewController = {
    addReview : async (req, res) => {
        try {
            // console.log('hello anshuman');
            const user = await Users.findById(req.user.id);
            // console.log(`User ---> ${user}`);
            if(!user) return res.status(400).json({
                message : "user not exits"
            })
            // console.log(`----> ${req.user.id} --> `);
            const {name } = user;
            const {review, user_id} = req.body;
            // console.log(`id : ${_id} name : ${name} review : ${review}`);
            const newReview = new Review({
                user_id,
                name, review
            });
            await newReview.save();
            // console.log(newReview);
            res.json({
                newReview
            });
        } catch (error) {
            return res.status(400).json({message : error})
        }
    },
    getReview : async (req, res) => {
        try {
            const allReview = await Review.find();
            res.json(allReview);
        } catch (error) {
            return res.status(400).json({
                message : error
            })
        }
    }
}

module.exports = reviewController;