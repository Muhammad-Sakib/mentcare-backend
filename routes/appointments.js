const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointments');

//Create Appointment
router.route("/createappointment").post(appointmentController.createAppointment);

//Appointment Detail
router.route("/appointmentdetail/:appointmentid").get(appointmentController.appointmentDetail);

//Appointment Status update
router.route('/updatestatus/:appointmentid').patch(appointmentController.updateAppointmentStatus);

//Appointment Prescription update
router.route('/updateprescription/:appointmentid').patch(appointmentController.updateAppointmentPrescription);


//Delete Appointment
router.route('/deleteappointment/:appointmentid').delete(appointmentController.deleteAppointment);


//get all appointment list
router.route('/allappointmentlist/').get(appointmentController.allAppointmentList);


module.exports = router;