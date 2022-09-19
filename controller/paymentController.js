const Payment = require('../models/paymentModel');
const Products = require('../models/productModel');
const Users = require('../models/userModel');

const paymentController = {
    getPayments : async (req, res) => {
        try {
            const payment = await Payment.find()
            res.json(payment);

        } catch (error) {
            return res.status(500).json({
                message : error.message,
            })
        }
    },
    createPayment :  async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email');
            if(!user) return res.status(400).json({
                message : "user not exits",
            })
            
            const {cart , paymentID, address } = req.body;
            const {_id, name, email } = user;

            const newPayment = new Payment({
                user_id : _id,
                name, email, cart, paymentID, address
            })

            cart.filter((item) => {
                return sold(item._id, item.Quantity, item.sold)
            })

            await newPayment.save();
            res.json({newPayment});

        } catch (error) {
            return res.status(500).json({
                message : error.message,
            })
        }
    }
}

const sold = async (id, quantity, oldSold) => {
    console.log("hello");
    console.log((parseInt(quantity) + parseInt(oldSold)));
    await Products.findOneAndUpdate({
        _id : id
    }, {
        sold : (parseInt(quantity) + parseInt(oldSold))
    })
}
module.exports = paymentController;