const express=require("express");
const router=express.Router();
const {index_control}=require("../controllers/index_controller")
router.get("/",index_control);
module.exports=router;