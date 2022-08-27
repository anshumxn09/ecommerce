const productController = require("../controller/productController");
const router = require("express").Router();

router.route("/products")
    .get(productController.getProducts)
    .post(productController.createProducts);

router.route("/products/:id")
    .delete(productController.deleteProducts)
    .put(productController.updateProducts);

module.exports = router;
