const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
            
                    patientId:{
                type:String,

                },
                    doctorId:{
                type:String,
                },
                    aptDate:{
                type:String,
                },
                    aptTime:{
                type:String,
                },
                    bookingTime:{
                type:String,
                },
                bookingDate:{
                    type:String,
                    },
                    amount:{
                type:String,
                },
                    prescriptionUrl:{
                type:String,
                },
                    status:{
                type:String,
                },
                
});

module.exports = mongoose.model("Appointment",appointmentSchema);