const express=require("express")
const {getEditUser,postEditUser,EditUserPassword}=require("../controllers/userEditController")
const editRouter=express.Router()

editRouter.get("/",getEditUser)
editRouter.post("/",postEditUser)
editRouter.post("/edituserpassword",EditUserPassword)

module.exports=editRouter
