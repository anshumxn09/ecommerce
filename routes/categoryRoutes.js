const categoryController = require("../controller/categoryController");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

const router = require("express").Router();

router
  .route("/category")
  .get(categoryController.getCategories)
  .post(auth, adminAuth, categoryController.createCategory);

router
  .route("/category/:id")
  .delete(auth, adminAuth, categoryController.deleteCategory)
  .put(auth, adminAuth, categoryController.updateCategory);

module.exports = router;
