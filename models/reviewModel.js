const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    user_id : {
        type: String,
        required : true
    },
    name : {
        type: String,
        required : true,
    },
    review : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('Review', ReviewSchema);