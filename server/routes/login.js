const express=require("express")
const bcrypt=require("bcrypt")
const router=express.Router();
const user=require("../models/Users")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const process = require('process');

const secret = process.env.SECRET;
router.use(express.json());
router.use(express.urlencoded({extended:true}));

let SESSIONID = '';

router.post("/", async(req,res)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
    const userData=await user.findOne({email})

    if(userData){
        bcrypt.compare(password, userData.password, async (err, result) => {
            if(err) {
                return res.status(400).json({
                    status: "Failed",
                    message: err.message
                })
            }
            if(result){
                const token=jwt.sign(
                    {
                        exp: Math.floor(Date.now()/1000) + 60*60,
                        data: userData._id
                    },
                    secret
                );
                SESSIONID = token;
                return res.status(200).json({
                    status:"Login Successful",
                    token
                });
            }
        
    })
    }else{
        return res.status(400).json({
            status: "Failed",
            message: "Invalid credentials! Please provide valid email/password"
        })
    }
} catch(e) {
    res.status(500).json({
        status: "Failed",
        message: e.message
    })
}
    
})

router.get('/get-current-user', (req, res) => {
    const sessionId = req.query.sessionId;
    // console.log('from get-current-uesr sessionId:', sessionId);
    // console.log('from get-current-uesr SESSIONID:', SESSIONID);
    // console.log(sessionId === SESSIONID);
    if(sessionId === SESSIONID) {
        res.status(200).send(true);
    } else {
        res.status(401).send(false);
    } 
})

module.exports = router;