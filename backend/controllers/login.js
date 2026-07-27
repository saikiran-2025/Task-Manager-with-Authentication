const User=require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const lgcont=async(req,res)=>{
    try{
        const { email,pwd }=req.body;

        if(!email || !pwd){
            return res.status(400).json({ err:"Need to fill all fields" })
        }

        const exists=await User.findOne({ email:email.toLowerCase() })
        if(!exists){
            return res.status(401).json({msg:"Invalid credentials"})
        }

        const isMatch=await bcrypt.compare(pwd,exists.pwd);
        if(!isMatch){
            return res.status(401).json({msg:"Invalid credentials"})
        }

        const payload={ _id:exists._id,fullname:exists.fullname};
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY , { expiresIn: "1h" });
        
        return res.status(200).json({token,email: exists.email,_id: exists._id});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ err: "Error in login"});
    }
}
module.exports={ lgcont }