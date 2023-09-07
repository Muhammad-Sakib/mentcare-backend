const PatientModel = require('../models/patient');
const DoctorModel = require('../models/doctor')

const bcrypt = require("bcrypt");
const global = require("../global/forgotpassword");

const registerPatient = async(req,res)=>{
    try {
    const hashedPassword =  await bcrypt.hash(req.body.password,10);
    const patientData = {
        "name": req.body.name,
        "mobile": req.body.mobile,
        "password" : hashedPassword,
        "email": req.body.email
        }
            const newPatient =  new PatientModel(patientData);
            const result = await newPatient.save();
                    console.log(result);
                    res.send({
                        "status": true,
                        "message" : "Patient account created successfully",
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

const loginPatient = async(req,res)=>{
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        console.log(userEmail);
        console.log(userPassword);

        if ((userEmail !=null && userEmail !="") || (userPassword !=null && userPassword !="")) {
            
            const isEmailExist = await PatientModel.findOne({email: userEmail});

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

const deleteAccount = async(req,res)=>{
    try {
        const userId = req.params.userid;
        const patientId = req.params.patientid;
        console.log(userId + patientId);
                const result = await CompanyModel.findOneAndDelete({_id:patientId,ownerId: userId});
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

const patientDetail = async(req,res)=>{
    try {
        const patientId = req.params.patientid;
        const result = await PatientModel.findOne({_id: patientId});
        console.log(result);
        if (result != null) {
            res.send(result)
    }
    else{
        res.send({ 
            "status": false,
            "message" : "Patient not found",
    })
    }
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}


const allPatientList = async(req,res)=>{
    
    try {
            const patientList = await PatientModel.find().select({ __v:0});
            if(patientList.length >0){
            console.log(patientList);
            res.send(patientList);
        } else {
            res.send({
                "status": false,
                "message" : "No patient found.",
        })
        }
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}

const changePassword = async(req,res)=>{
    try {
    const userId = req.body.userid;
    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.newpassword;
    
    const hashedNewPassword =  await bcrypt.hash(newPassword,10);

    if(oldPassword == undefined){
        const verifyPatientAndUpdate = await PatientModel.findOne({_id: userId});
        if(verifyPatientAndUpdate !=null){
                await PatientModel.findOneAndUpdate({_id: userId,},{password: hashedNewPassword});
                res.send({
                    status: true,
                    message: "Password has Changed."
                });         
        }
        else{
            const verifyDoctorAndUpdate = await DoctorModel.findOne({_id: userId,});
            if(verifyDoctorAndUpdate !=null){
                    await DoctorModel.findOneAndUpdate({_id: userId,},{password: hashedNewPassword});
                    res.send({
                        status: true,
                        message: "Password has Changed."
                    });   
            }
            else{
                res.send({
                    status: false,
                    message: "User not found"
                });
            }

        }
    }
    else{
        if(verifyPatientAndUpdate !=null){
            const isPasswordMatched = await bcrypt.compare(oldPassword, verifyPatientAndUpdate.password);
    
            if(isPasswordMatched){
                await PatientModel.findOneAndUpdate({_id: userId,},{password: hashedNewPassword});
                res.send({
                    status: true,
                    message: "Password has Changed."
                });
            }
            else{
                res.send({
                    status: false,
                    message: "Password not matched."
                });
            }
        }
        else{
            const verifyDoctorAndUpdate = await DoctorModel.findOne({_id: userId,});
            // console.log(verifyDoctorAndUpdate)
            if(verifyDoctorAndUpdate !=null){
                const isPasswordMatched = await bcrypt.compare(oldPassword, verifyDoctorAndUpdate.password);
                if(isPasswordMatched){
                    await DoctorModel.findOneAndUpdate({_id: userId,},{password: hashedNewPassword});
                    res.send({
                        status: true,
                        message: "Password has Changed."
                    });
                }
                else{
                    res.send({
                        status: false,
                        message: "Password not matched."
                    });
                }
            }
            else{
                res.send({
                    status: false,
                    message: "Password not matched."
                });
            }
        }
    }

    

    } catch (error) {
        console.log('error');
        res.send({
            status: false,
            message: "Password not matched."
        });
    }
}
const forgotPassword = async(req,res)=>{
    const email = req.body.email;
    const verifyPatientEmail = await PatientModel.findOne({email: email});
    var isEmailVerified=false;
    var userName;
    var userId;
    if (verifyPatientEmail != null) {
        isEmailVerified = true;
        userName = verifyPatientEmail.name;
        userId = verifyPatientEmail._id;
    } else {
        const verifyDoctorEmail = await DoctorModel.findOne({email: email});

        if (verifyDoctorEmail != null) {
            isEmailVerified = true;
            userName = verifyDoctorEmail.name;
            userId = verifyDoctorEmail._id;
        } else {
            res.send({
               status: false,
               message: "Email doesn't exist." 
            });
        }
    }
   if (isEmailVerified) {
    console.log(userName);
    try {
        const verificationCode =  global.forgotPasswordMail(email,userName);
    console.log(verificationCode);
    res.send({
        status: true,
        "message:": "Email found",
        "verificationCode": verificationCode,
        "uid": userId
    });
    } catch (error) {
        res.send({
            status: false,
            message: "Email not sent." 
        });
    }
   } else {
        res.send({
            status: false,
            message: "Email doesn't exist." 
        });
   }
}

module.exports = {registerPatient, loginPatient ,deleteAccount,changePassword,forgotPassword, patientDetail, allPatientList};