const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name:{
type:String,
            default: "Not set yet"
},
    uid:{
type:String,
            default: "Not set yet"
},
    email:{
type:String,
unique:true,
            default: "Not set yet"
},
mobile:{
    type:String,
    unique:true,
            default: "Not set yet"
},
    password:{
type:String,
            default: "Not set yet"
},
    address:{
type:String,
            default: "Not set yet"
},
    dob:{
type:String,
            default: "Not set yet"
},
});

module.exports = mongoose.model("Patient",patientSchema);