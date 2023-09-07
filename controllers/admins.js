const AdminModel = require('../models/admin')
const bcrypt = require("bcrypt");


const registerAdmin = async(req,res)=>{
    try {
    const hashedPassword =  await bcrypt.hash(req.body.password,10);
    const adminData = {
        "name": req.body.name,
        "mobile": req.body.mobile,
        "password" : hashedPassword,
        "email": req.body.email
        }
            const newAdmin =  new AdminModel(adminData);
            const result = await newAdmin.save();
                    console.log(result);
                    res.send({
                        "status": true,
                        "message" : "Admin account created successfully",
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

const loginAdmin = async(req,res)=>{
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        console.log(userEmail);
        console.log(userPassword);

        if ((userEmail !=null && userEmail !="") || (userPassword !=null && userPassword !="")) {
            
            const isEmailExist = await AdminModel.findOne({email: userEmail});

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


const updateAdminData = async(req,res)=>{
    try {
        const adminId = req.params.adminid;
        const data = req.body;
        console.log(adminId);
        console.log(data);
                const result = await AdminModel.findOneAndUpdate({_id:adminId},data,{new:true});
                console.log(result);
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


const deleteAdmin = async(req,res)=>{
    try {
        const userId = req.params.userid;
        const adminId = req.params.adminid;
        console.log(userId + adminId);
                const result = await AdminModel.findOneAndDelete({_id:adminId,ownerId: userId});
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




const changePassword = async(req,res)=>{
    try {
    const userId = req.body.userid;
    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.newpassword;
    const hashedNewPassword =  await bcrypt.hash(newPassword,10);

    const verifyAdminAndUpdate = await AdminModel.findOne({_id: userId});
    if(verifyAdminAndUpdate !=null){
        const isPasswordMatched = await bcrypt.compare(oldPassword, verifyAdminAndUpdate.password);

        if(isPasswordMatched){
            await AdminModel.findOneAndUpdate({_id: userId,},{password: hashedNewPassword});
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
            message: "User not found."
        });
    }
    

    } catch (error) {
        console.log('error');
        res.send({
            status: false,
            message: "Password not matched."
        });
    }
}
module.exports = {registerAdmin, loginAdmin , updateAdminData,deleteAdmin,changePassword};