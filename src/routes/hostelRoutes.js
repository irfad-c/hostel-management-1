const express=require('express')
const router=express.Router()
const hostelController=require("../controllers/hostelController")
const validateHostel=require("../validators/hostelValidator.js")
const handleValidationErrors=require("../middlewares/validatorMiddleware")


router.post("/",validateHostel,handleValidationErrors,hostelController)


module.exports=router