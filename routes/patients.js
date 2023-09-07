const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patients');

//Register Patient
router.route("/registerpatient").post(patientController.registerPatient);

//Login Patient
router.route("/loginpatient").post(patientController.loginPatient);

//Delete Patient
router.route('/:userid/deleteaccount').delete(patientController.deleteAccount);

//Change Password
router.route('/changepassword/').patch(patientController.changePassword);

//Forgot Password
router.route('/forgotpassword/').post(patientController.forgotPassword);

//Patient Detail
router.route('/patientdetail/:patientid').get(patientController.patientDetail);

//get all patient list
router.route('/allpatientlist/').get(patientController.allPatientList);


module.exports = router;