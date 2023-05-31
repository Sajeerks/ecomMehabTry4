const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProductDetails,
  createProductReview,
  getAllProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");

router
  .route("/products")
  // .get(isAuthenticated, authorizedRoles("admin"), getAllProducts);
  .get( getAllProducts);

router.route("/product/new").post(isAuthenticated, createProduct);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProductDetails);

router.route("/reviews").put(isAuthenticated, createProductReview).get(isAuthenticated,getAllProductReviews).delete(isAuthenticated,deleteReview)

module.exports = router;
