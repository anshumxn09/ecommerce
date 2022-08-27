const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');
const Products = require('../models/productModel');

const productController = {
    getProducts : async(req, res) => {
        try {
            const products = await Products.find()

            res.json({
                products
            })
        } catch (error) {
            return res.status(500).json({
                message:error
            })
        }
    },
    createProducts : async(req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;

            if(!images) return res.status(400).json({
                message: "upload the images of the products." 
            })

            const product = await Products.findOne({product_id});
            if(product) return res.status(400).json({
                message:"product already exists",
            })

            const newProduct = new Products({
                product_id, title:title.toLowerCase() , price, description, content, images, category
            })

            await newProduct.save()
            res.json({
                message: "created a product"
            })
        } catch (error) {
            return res.status(500).json({
                message:error
            })
        }
    },
    updateProducts : async(req, res) => {
        try {
            const {title, price, description, content, images, category} = req.body;

            if(!images) return res.status(400).json({
                message: "upload the images of the products." 
            })

            await Products.findOneAndUpdate({
                _id:req.params.id,
            }, {title:title.toLowerCase(), price, description, content, images, category})

            res.status(200).json({
                message:"updated the product"
            })
        } catch (error) {
            return res.status(500).json({
                message:error
            })
        }
    },
    deleteProducts : async(req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({
                message: "deleted the products"
            })
        } catch (error) {
            return res.status(500).json({
                message:error
            })
        }
    }
}

module.exports = productController;