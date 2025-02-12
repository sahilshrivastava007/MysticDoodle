const express=require("express");
const router=express.Router();
const {index_control, checkroom}=require("../controllers/index_controller")
router.get("/",index_control);
router.post("/checkroom",checkroom)
module.exports=router;