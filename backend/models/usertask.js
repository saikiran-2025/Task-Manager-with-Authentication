const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    tasktitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum: ['upcoming','completed','incompleted','missed'],
        default:'upcoming'
    },
    createdAt:{ type:Date,default:Date.now}
})
const taskModel=mongoose.model("Task",taskSchema);
module.exports=taskModel;