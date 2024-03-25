const express=require("express")
const {getEditUser,postEditUser}=require("../controllers/userEditController")
const editRouter=express.Router()

editRouter.get("/",getEditUser)
editRouter.post("/",postEditUser)

module.exports=editRouter
