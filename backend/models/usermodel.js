const mongoose=require("mongoose")

const us=new mongoose.Schema({
    fullname:{
        type:String,
        required: [true,"Full name is required"],
        trim:true
    },
    email:{
        type:String,
        required: [true,"E-mail is required"],
        unique:true,
        trim:true,
        lowercase:true
    },
    pwd:{
        type:String,
        required:[true,"Password is required"]
    }
}, { timestamps: true } )

const um=mongoose.model("User",us);
module.exports=um;