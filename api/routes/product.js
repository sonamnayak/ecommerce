const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require('./token');
const router = require('express').Router()
const CryptoJS = require('crypto-js');
const Product = require('../models/Product');

//CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(err)
    }
})

//UPDATE 
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set : req.body }, { new: true })
    } catch (error) {
        res.status(500).json(error)
    }
    res.status(200).json(updatedProduct)
})

//DELETE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted!')
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET PRODUCT
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL PRODUCTS
router.get('/', async (req, res) => {
    const qNew = req.query.new
    const qCategories = req.query.categories
    try {
        let products;
        if(qNew)
            products = await Products.find().sort({createdAt: -1}).limilt(1)
        if(qCategories)
            products = await Products.find({categories: {$in: [qCategories]}})
        else
            products = await Products.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router; 