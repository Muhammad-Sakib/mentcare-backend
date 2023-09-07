const AppointmentModel = require('../models/appointment')
const DoctorModel = require('../models/doctor')
const PatientModel = require('../models/patient')


const createAppointment = async(req,res)=>{
    try {
    const appointmentdata = req.body;
            const newAppointment =  new AppointmentModel(appointmentdata);
            const result = await newAppointment.save();
                    console.log(result);
                    res.send({
                        "status": true,
                        "message" : "Appointment created successfully",
                        "uid" : result._id, 
                        }
                        )
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}

const updateAppointmentStatus = async(req,res)=>{
    try {
        const appointmentId = req.params.appointmentid;
    const appointmentStatus = req.body.status;
    const result = await AppointmentModel.findOneAndUpdate({_id:appointmentId},{$set:{
        status: appointmentStatus, 
    }});
    if (result != null) {
        res.send({
            "status": true,
            "message" : "Status updated successfully",
            });
    } else {
        res.send({
            "status": false,
            "message" : "Appoinment not found",
            });
    }
    } catch (error) {
        res.send({
            "status": false,
            "message" : "Appoinment not found",
            });
    }
}


const updateAppointmentPrescription = async(req,res)=>{
    try {
        const appointmentId = req.params.appointmentid;
    const prescriptionUrl = req.body.prescriptionUrl;
    console.log(prescriptionUrl);
    const result = await AppointmentModel.findOneAndUpdate({_id:appointmentId},{$set:{
        prescriptionUrl: prescriptionUrl, 
    }});
    if (result != null) {
        res.send({
            "status": true,
            "message" : "Prescription updated successfully",
            });
    } else {
        res.send({
            "status": false,
            "message" : "Appoinment not found",
            });
    }
    } catch (error) {
        res.send({
            "status": false,
            "message" : "Appoinment not found",
            });
    }
}


const appointmentDetail = async(req,res)=>{
    try {
        const appointmentId = req.params.appointmentid;
        console.log(appointmentId);
                const result = await AppointmentModel.findOne({_id:appointmentId});
                console.log(result);
                if (result != null) {
                    res.send(result)   
                } else {
                    res.send({
                        "status": false,
                        "message" : "Appoinment not found",
                        }
                        )   
                }


    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}


const deleteAppointment = async(req,res)=>{
    try {
        const appointmentId = req.params.appointmentid;

                const result = await AppointmentModel.findOneAndDelete({_id:appointmentId});
                console.log(result);
                if (result != null) {
                    res.send({
                        "status": true,
                        "message" : "Appointment deleted successfully",
                        }
                        )   
                } else {
                    res.send({
                        "status": false,
                        "message" : "Failed to delete Appointment",
                        }
                        )   
                }


    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}



const allAppointmentList = async(req,res)=>{
    try {

            const appointmentList = await AppointmentModel.find().select({ __v:0});
            const doctorList = await DoctorModel.find().select({name:1,title:1,imageUrl:1});
            const patientList = await PatientModel.find().select({name:1,imageUrl:1});
            var updatedAppointmentList=[];
            for (let index = 0; index < appointmentList.length; index++) {
                
               for (let j = 0; j < doctorList.length; j++) {
                    if(appointmentList[index].doctorId == doctorList[j]._id){
                        
                        updatedAppointmentList.push({
                            appointmentDetail: appointmentList[index],
                            doctorDetail: doctorList[j]
                        })
                    }
               }
                
            }

            if(updatedAppointmentList.length >0){
            res.send(updatedAppointmentList);
        } else {
            res.send({
                "status": false,
                "message" : "No appointment found.",
        })
        }
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}


module.exports = {createAppointment, appointmentDetail ,deleteAppointment, updateAppointmentStatus, updateAppointmentPrescription, allAppointmentList};