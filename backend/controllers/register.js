const bcrypt = require("bcrypt");
const User = require("../models/usermodel");

const regcont = async (req, res) => {
    console.log("Register API Hit");
    console.log(req.body);
  try {
    const { fullname, email, pwd, confirmPwd } = req.body;

    
    if (!fullname || !email || !pwd || !confirmPwd) {
      return res.status(400).json({ err: "Need to fill all fields" });
    }

    
    if (pwd !== confirmPwd) {
      return res.status(400).json({ err: "Password and confirm password must match" });
    }

    
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ err: "Account already exists" });
    }

    
    const hashedPwd = await bcrypt.hash(pwd, 10);

    console.log("Before create");
    const user = await User.create({fullname,email: email.toLowerCase(),pwd: hashedPwd});
    console.log("After create");
    
    return res.status(201).json({msg: "Registration successful",user: {fullname: user.fullname,email: user.email,_id: user._id}});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error.message || "Registration failed" });
  }
};

module.exports = { regcont };