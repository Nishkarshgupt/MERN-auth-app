const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already exists",
        success: false,
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hash,
    });
    res.status(201).json({
      message: "SignUp Successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

async function login(req, res) {
  try {
    const {email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Invalid Credials",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(403).json({
            message: "Invalid Credtials",
            success: false
        })
    }

    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, process.env.JWT_SECRET,
{expiresIn: '24h'})

    res.cookie("token", token)

    res.status(200).json({
      message: "login Successfully",
      success: true,
      email,
      token,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

module.exports = { signUp, login };
