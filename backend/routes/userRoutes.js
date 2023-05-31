const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  loggedInUserProfile,
  getSingleUserDetails,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/newuser").post(createUser);

router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/updatepassword").put(isAuthenticated, updatePassword);

router
  .route("/user/:id")
  .get(isAuthenticated, authorizedRoles("admin"), getSingleUserDetails)
  .put(isAuthenticated, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteUser);
router.route("/me").get(isAuthenticated, loggedInUserProfile);
router.route("/updateprofile").put(isAuthenticated, updateUserProfile);
router
  .route("/allusers")
  .get(isAuthenticated, authorizedRoles("admin"), getAllUsers);

module.exports = router;
