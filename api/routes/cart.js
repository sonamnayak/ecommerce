const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require('./token');
const router = require('express').Router()
const CryptoJS = require('crypto-js');
const Cart = require('../models/Cart');

//CREATE
router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(err)
    }
})

//UPDATE 
router.put('/:id', verifyTokenAndAuthorisation, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set : req.body }, { new: true })
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.put('/:id', verifyTokenAndAuthorisation, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been deleted!')
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET CART
router.get('/find/:id', verifyTokenAndAuthorisation, async (req, res) => {
    try {
        const cart = await Cart.findOne({id: req.params.id})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET CART OF ALL THE USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        response.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router; 