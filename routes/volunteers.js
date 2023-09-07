const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteers');

//Register Volunteer
router.route("/registervolunteer").post(volunteerController.registerVolunteer);

//Status Update Volunteer
router.route("/joininstantcall").get(volunteerController.joinInstantCall);


//get all volunteer list
router.route('/allvolunteerlist/').get(volunteerController.allVolunteerList);


module.exports = router;