const {JWT_SECRET} = require("../config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.Register =async(req, res)=> {
    try {
        let { name, email, password, passwordCheck } = req.body;
    
        // validate
    
        if (!name || !email || !password || !passwordCheck)
          return res.status(400).json({ msg: "Not all fields have been entered." });
        if (password.length < 5)
          return res
            .status(400)
            .json({ msg: "The password needs to be at least 5 characters long." });
        if (password !== passwordCheck)
          return res
            .status(400)
            .json({ msg: "Enter the same password twice for verification." });
    
        const existingUser = await User.findOne({ email: email });
        if (existingUser)
          return res
            .status(400)
            .json({ msg: "An account with this email already exists." });
    
        if (!name) name = email;
    
        const salt = await bcrypt.genSalt();
        const passwordHash = bcrypt.hashSync(password, salt);
    
        const newUser = new User({
            name,
            email,
            password: passwordHash,   
           
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

exports.Login = async(req, res) => {
    try {
        const { email, password } = req.body;
    
        // validate
        if (!email || !password)
          return res.status(400).json({ msg: "Not all fields have been entered." });
    
        const user = await User.findOne({ email: email });
        if (!user)
          return res
            .status(400)
            .json({ msg: "No account with this email has been registered." });
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Password or email is incorrect!" });
    
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
  };

  exports.Delete= async(req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user.id);
        res.json(deletedUser);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  }
exports.TokenIsValid = async(req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
    
        const verified = jwt.verify(token, JWT_SECRET);
        if (!verified) return res.json(false);
    
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
    
        return res.json(true);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

exports.FindUser = async(req, res) => {   

    try {
      const user = await User.findById(req.user.id).select('-password')
    res.json(user)
    } catch (error) {
      console.error(error.message)
    res.status(500).send('Server Error')
    }
}


