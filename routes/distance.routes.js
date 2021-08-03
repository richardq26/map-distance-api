const{Router}=require("express");
const router= Router();
const {calculate} = require("../controller/distance.controller");
router.post("/distance", calculate);

module.exports=router;