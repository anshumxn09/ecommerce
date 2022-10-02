const reviewController = require('../controller/reviewController');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.route("/review").get(reviewController.getReview)
.post(auth, reviewController.addReview);

module.exports = router;
