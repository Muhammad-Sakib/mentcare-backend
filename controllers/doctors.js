const DoctorModel = require('../models/doctor')
const bcrypt = require("bcrypt");


const registerDoctor = async(req,res)=>{
    try {
    const hashedPassword =  await bcrypt.hash(req.body.password,10);
    const doctorData = {
        "name": req.body.name,
        "mobile": req.body.mobile,
        "password" : hashedPassword,
        "email": req.body.email
        }
            const newDoctor =  new DoctorModel(doctorData);
            const result = await newDoctor.save();
                    console.log(result);
                    res.send({
                        "status": true,
                        "message" : "Doctor account created successfully",
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

const loginDoctor = async(req,res)=>{
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        console.log(userEmail);
        console.log(userPassword);

        if ((userEmail !=null && userEmail !="") || (userPassword !=null && userPassword !="")) {
            
            const isEmailExist = await DoctorModel.findOne({email: userEmail});

            if (isEmailExist !=null && isEmailExist !="") {
                const isPasswordMatched = await bcrypt.compare(userPassword, isEmailExist.password);
                if (isPasswordMatched) {
                    console.log("Matched");
                  console.log(isEmailExist._id.toString());
                    res.send({
                        "status": true,
                        "message" : "Authentication Successful",
                        "uid": isEmailExist._id.toString(),
                        });
                }
                else{
                    res.send({
                        "status": false,
                        "message" : "password not matched.",
                        });
                }
            } else {
                res.send({
                    "status": false,
                    "message" : "email not exists.",
                    });
            }
        } else {
             res.send({
                    "status": false,
                    "message" : "email or password is empty.",
                    });
        }
        
    } catch (error) {
        console.log(error);
        res.send({
                "status": false,
                "message" : error.message,
                });
    }
}


const updateDoctorData = async(req,res)=>{
    try {
        const doctorId = req.params.doctorid;
        const data = req.body;
        var filteredData={};
        for(let [key, value] of Object.entries(data)){
            if(value != ''){
                filteredData[key] = value;
            }
        }
        // if (data.username != '' || data.username != null ) {
        //     username
        // }
        // else if(){

        // }
        // const filteredData ={
        //         username: '',
        //         email: '',
        //         fullName: '',
        //         phoneNumber: '',
        //         address: '',
        //         title: '',
        //         price: '',
        //         aboutMe: '',
        //         education: [ { degree: '', academyName: '', passingYear: '' } ],
        //         experience: [ { hospitalName: 'dfjlkgdfnlgj' } ]

        // }
        console.log(filteredData);

                const result = await DoctorModel.findOneAndUpdate({_id:doctorId},data,{new:true});
                if (result != null) {
                    res.send({
                        "status": true,
                        "message" : "Data updated successfully",
                        }
                        )   
                } else {
                    res.send({
                        "status": false,
                        "message" : "Failed to update data",
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


const deleteAccount = async(req,res)=>{
    try {
        const userId = req.params.userid;
        const doctorId = req.params.doctorid;
        console.log(userId + doctorId);
                const result = await DoctorModel.findOneAndDelete({_id:doctorId,ownerId: userId});
                console.log(result);
                if (result != null) {
                    res.send({
                        "status": true,
                        "message" : "Account deleted successfully",
                        }
                        )   
                } else {
                    res.send({
                        "status": false,
                        "message" : "Failed to delete account",
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


const doctorDetail = async(req,res)=>{
    try {
        const doctorId = req.params.doctorid;
        const result = await DoctorModel.findOne({_id: doctorId});
        console.log(result);
        if (result != null) {
            res.send(result)
    }
    else{
        res.send({ 
            "status": false,
            "message" : "Doctor not found",
    })
    }
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}

const allDoctorList = async(req,res)=>{
    try {

            const doctorList = await DoctorModel.find().select({ __v:0});
            if(doctorList.length >0){
            res.send(doctorList);
        } else {
            res.send({
                "status": false,
                "message" : "No doctor found.",
        })
        }
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}


module.exports = {registerDoctor, loginDoctor , updateDoctorData, deleteAccount, doctorDetail, allDoctorList};