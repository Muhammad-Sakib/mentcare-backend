const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctors');

//Register Doctor
router.route("/registerdoctor").post(doctorController.registerDoctor);

//Login Doctor
router.route("/logindoctor").post(doctorController.loginDoctor);

//Delete Doctor
router.route('/:userid/deleteaccount').delete(doctorController.deleteAccount);

//Update Data
router.route('/updatedata/:doctorid').patch(doctorController.updateDoctorData);

//Doctor Detail
router.route('/doctordetail/:doctorid').get(doctorController.doctorDetail);

//get all doctor list
router.route('/alldoctorlist/').get(doctorController.allDoctorList);


module.exports = router;