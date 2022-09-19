const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const Payment = require("../models/paymentModel");

const userControl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // console.log(req.body);
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ message: "user already exists.." });

      if (password.length < 6)
        return res.status(400).json({
          message: "password should be more than 6 characters",
        });

      // ENCRYPTION OF THE PASSWORD....
      const passwordHashing = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHashing,
      });

      await newUser.save();

      // GRANTING TOKEN ONCE ALL THE REGISTER STEPS ARE DONE.
      const accessToken = createAcessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });
      // console.log(refreshToken);
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/users/refresh_token",
      });

      res.json({
        accessToken,
      });
      // res.json({
      //     user : newUser,
      //     message : "SUCCESSFULLY ADDED TO THE COLLECTIONS"
      // })
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({
        message : "Please login or register"
      })

      jsonwebtoken.verify(rf_token, process.env.REFRESH_KEY, (err, user) => {
        if(err) return res.status(400).json({
            message : "Please login or register"
          })
        const accesstoken = createAcessToken({id:user.id})
        res.json({
            user, accesstoken
        })
      })
      return res.json({ rf_token });
    } catch (error) {
      return res.status(500)
    }
  },
  login : async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await Users.findOne({email});
      if(!user) return res.status(400).json({message:"USER DOESN'T EXIST"});

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) return res.status(400).json({message:"PASSWORD DOESN'T MACTHED"});

      // if email and password is successfully authenticated then pass the token.
      
      const accessToken = createAcessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });
      // console.log(refreshToken);
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/users/refresh_token",
      });

      res.json({
        accessToken,
      });

    } catch (error) {
      return res.status(500).json({message:error.message})
    }
  },
  logout : async (req, res) => {
    try {
      res.clearCookie('refreshtoken', {
        path:'/users/refresh_token'
      })
      return res.json({
        message : "logged out"
      })
    } catch (error) {
      return res.status(500).json({message:error.message})
    }
  },
  getUser : async(req, res) => {
    try {
      const user = await Users.findById({_id: req.user.id}).select('-password');
      if(!user) return res.status(500).json({
        message: "user doesnt exist..",
      })

      res.json(user)
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  },
  addCart : async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if(!user) return res.status(400).json({
        message : "User Doesn't Exists!!!!!!"
      })

      await Users.findOneAndUpdate({_id:req.user.id}, {
        cart : req.body.cart
      })

      return res.json({
        message: "updated the cart",
      })
    } catch (error) {
      return res.status(500).json({
        message : error.message
      })
    }
  },
  history : async (req, res) => {
    try {
      // console.log(req.user.id);
      const history = await Payment.find({user_id: req.user.id});
      // console.log(history);
      res.json(history);
    } catch (error) {
      return res.status(500).json({
        message : error.message
      })
    }
  }
};

const createAcessToken = (userId) => {
  return jsonwebtoken.sign(userId, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (userId) => {
  return jsonwebtoken.sign(userId, process.env.REFRESH_KEY, {
    expiresIn: "7d",
  });
};

module.exports = userControl;
