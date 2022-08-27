const Category = require("../models/categoryModel");

const categoryController = {
    getCategories : async(req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    },
    createCategory : async (req, res) => {
        try {
            // only admin can create, delete and update category.
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({
                message : "this category already exists."
            })

            const newCategory = new Category({name});
            await newCategory.save();

            res.json({
                message : "Created a category."
            });
        } catch (error) {
            return res.status(500).json({
                message : error.message
            })
        }
    },
    deleteCategory : async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({
                message: "deleted the category"
            })
        } catch (error) {
            return res.status(500).json({
                message : error.message
            })
        }
    },
    updateCategory : async (req, res) => {
        try {
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id : req.params.id}, {name})

            res.json({
                message : "updated a category",
            })
        } catch (error) {
            return res.status(500).json({
                message:error.message
            })
        }
    }
}

module.exports = categoryController;