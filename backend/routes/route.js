let express=require("express")
let rt=express.Router()

let { lgcont }=require("../controllers/login")
let { regcont }=require("../controllers/register")
let { resetpwd }=require("../controllers/resetpwd")
let { addTask }=require("../controllers/addtask")
let { updateTask, deleteTask ,getUpcomingTasks}=require("../controllers/upcomingtask")
let { getCompletedTasks }=require("../controllers/completedtask")
let { getMissedTasks }=require("../controllers/missedtask")
let { logoutUser }=require("../controllers/logout")

rt.post("/login",lgcont)
rt.post("/register",regcont);
rt.post("/reset",resetpwd)

rt.post("/addtask",addTask)

rt.get("/tasks/upcoming",getUpcomingTasks)  /*upcoming task*/
rt.put("/tasks/:id",updateTask)       
rt.delete("/tasks/:id",deleteTask);

rt.get("/tasks/completed",getCompletedTasks)  /*completed tasks*/

rt.get("/tasks/missed",getMissedTasks)  /*missed tasks*/

rt.post("/logout/:email",logoutUser)
module.exports=rt