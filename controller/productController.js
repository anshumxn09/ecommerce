const Products = require('../models/productModel');

class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}

        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach( element => delete(queryObj[element]));

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            // console.log(sortBy);
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    pagination(){
        const page = this.queryString * 1 || 1;
        const limit = this.queryString.limit * 1 || 6;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productController = {
    getProducts : async(req, res) => {
        try {
            // console.log(req.query);
            const features = new APIFeatures(Products.find(), req.query).filtering().sorting().pagination();
            const products = await features.query

            // console.log(products);
            res.json({
                status : "success",
                result : products.length,
                products : products,
            })
        } catch (error) {
            return res.status(500).json({
                error : error.message
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
                product_id, title:title.toLowerCase(), price, description, content, images, category
            })
            await newProduct.save()
            // console.log(price);
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