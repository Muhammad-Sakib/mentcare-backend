const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admins');

//Register Admin
router.route("/registeradmin").post(adminController.registerAdmin);

//Login Admin
router.route("/loginadmin").post(adminController.loginAdmin);

//Delete Admin
router.route('/deleteadmin/:adminid').delete(adminController.deleteAdmin);

//Change Password
router.route('/changepassword').patch(adminController.changePassword);

module.exports = router;