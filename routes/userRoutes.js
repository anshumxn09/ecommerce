const userControl = require('../controller/userController');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.post('/register', userControl.register);
router.post('/login', userControl.login);
router.get('/logout', userControl.logout);
router.get('/refresh_token', userControl.refreshToken);
router.get('/infor', auth, userControl.getUser);
router.patch('/addtocart', auth, userControl.addCart);
module.exports = router;