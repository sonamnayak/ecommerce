const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require('./token');
const router = require('express').Router()
const CryptoJS = require('crypto-js');
const Order = require('../models/Order');

//CREATE
router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(err)
    }
})

//UPDATE 
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set : req.body }, { new: true })
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted!')
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ORDERS
router.get('/find/:id', verifyTokenAndAuthorisation, async (req, res) => {
    try {
        const orders = await Order.find({id: req.params.id})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ORDERS OF ALL THE USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        response.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: {$gte: previousMonth}, 
                    ...(productsId && {
                        products: { $elemMatch: {productsId}},
                    })
                }
            },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month", 
                    total: {$sum: "$sales"}
                }
            }
        ])
        res.status(200).json(income) 
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router; 