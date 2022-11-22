const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require('./token');
const router = require('express').Router()
const CryptoJS = require('crypto-js');
const User = require('../models/User');

//UPDATE 
router.put('/:id', verifyTokenAndAuthorisation, async (req, res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.crypto).toString(CryptoJS.enc.Utf8)
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set : req.body }, { new: true })
    } catch (error) {
        res.status(500).json(error)
    }
    res.status(200).json(updatedUser)
})

//DELETE
router.put('/:id', verifyTokenAndAuthorisation, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted!')
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
        res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  })

//GET STATUS
router.get('/status', async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)) // this gives the previous year from today's date
    try {
        const data = await User.aggregate([ //lets us create status report for a perticular year users: similar to creating a collection
            {
                $match: {createdAt: {$gte: lastYear}} //fetch all the users created after lastYear
            },
            {
                $project: {month: {$month: "createdAt"}} //gets the month of sll the users creation date
            },
            {
                $group: {
                            _id: "$month", //groups together users from the same month
                            total: {$sum: 1} //this will increase the count for every added user
                        }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(err)
    }
})

// router.get("/usertest", (req, res) => {
//     res.send("usertest post successful")
// })

// router.post("/usertestpost", (req, res) => {
//     const username = req.body.username;
//     res.send("username is: " + username)
// })

module.exports = router; 