const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Plese fill all Fieled",
        success: true,
      });
    }
    const user = new User({ name, email, password });
    await user.save();
    return res.status(200).json({
      message: "user Register Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password is required",
        success: false,
      });
    }
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    // const compare = await bcrypt.compare(password, user.password);
    // if (!compare) {
    //   return res.status(400).json({
    //     message: "invalid Credentials",
    //     success: false,
    //   });
    // }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    res.send({
      success: true,
      message: "user Login Successfully",
      status: 200,
      token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
const currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (!user) {
      return res.send({
        status: 400,
        message: "user does not exist",
        success: false,
      });
    }
    res.send({
      success: true,
      message: "getUser  Successfully",
      status: 200,
      user,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 400,
      message: error.message,
      error,
    });
  }
};

module.exports = { register, login, currentUser };
