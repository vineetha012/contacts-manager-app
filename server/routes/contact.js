const express = require("express")
const Contacts = require("../models/Contacts")
const User = require('../models/Users')
const router = express.Router()
const bodyParser = require('body-parser');
const contactlist = [];

router.use(bodyParser.json());

router.post("/", async (req, res) => {
    try {
        const newData = req.body;
        // console.log(newData);
        newData.forEach(async list => {
            let contact = await Contacts.create({
                name: list.name,
                designation: list.designation,
                company: list.company,
                industry: list.industry,
                email:list.email,
                phoneNumber: list.phoneNumber,
                country: list.country,
                userRef: req.user
            })
            // console.log('contact from post', contact);
            contactlist.push(contact)
        })
        res.status(200).json({
            status: "success",
            contactlist
        })

    } catch (e) {
        res.status(400).json({
            status: "Failed to post Contacts",
            message: e.message

        })
    }
})


router.get("/", async(req, res) => {
    try {
        // const pageNo = req.query.page;
        const contactlist = await Contacts.find({userRef: req.user}) //.skip(pageNo - 1).limit(10);
        res.status(200).json({
            status: "success",
            data: contactlist
        })

    } catch (e) {
        res.status(400).json({
            status: "Failed to get Contacts",
            message: e.message
        })
    }
})

// { $regex: req.params.key }
router.get("/:key", async (req, res) => {
    try {
        // let contactlist = await Contacts.findOne({
        //     $and: [
        //         {email: req.params.key }, {userRef: req.user}
        //     ]
        // })
        let contactlistSearchkey = await Contacts.findOne({$and : [{email:{ $regex: req.params.key}}, {userRef: req.user}] })

        res.status(200).json({
            status: "Success",
            contactlistSearchkey
        })
    }
    catch (e) {
        res.status(400).json({
            status: "Failed to search contact",
            message: e.message

        })
    }
})

router.delete("/", async (req, res) => {
    try{
        const ids = req.body;
        // console.log(ids);
        ids.forEach(async id => {
            await Contacts.deleteOne({_id: id})  //({$and: {_id:id, userRef: req.user}}) 
        })
        res.status(200).json({
            status: "Success",
            message: "Contacts get deleted successfully"
        })   
    } catch(e){
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try{
        let id = req.params.id
        await Contacts.deleteOne({$and: {_id:id, userRef: req.user}})
        res.status(200).json({
            status: "Success",
            message: "Contact get deleted successfully"
        })
        
    }catch(err){
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router