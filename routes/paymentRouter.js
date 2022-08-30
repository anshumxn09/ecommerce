const router = require('express').Router();
const paymentController = require('../controller/paymentController');
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

router.route('/payment').get(auth, adminAuth, paymentController.getPayments)
.post(auth, paymentController.createPayment);


module.exports = router;
