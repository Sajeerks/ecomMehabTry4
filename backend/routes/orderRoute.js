const express = require("express");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { get } = require("mongoose");
const router = express.Router();

router.route("/createOrder").post(isAuthenticated, createOrder);
router
  .route("/order/:id")
  .get(isAuthenticated, authorizedRoles("admin"), getSingleOrder).put(isAuthenticated,authorizedRoles("admin") ,updateOrderStatus)
  .delete(isAuthenticated, authorizedRoles("admin") , deleteOrder)
router.route("/myorders").get(isAuthenticated, myOrders);
router.route("/allorders").get(isAuthenticated, authorizedRoles("admin"), getAllOrders);


module.exports = router;
