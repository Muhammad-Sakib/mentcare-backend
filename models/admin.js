const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        default: "Not set yet"
},
    
    email:{
        type: String,

            default: "Not set yet"
},
    password:{
        type: String,

            default: "Not set yet"
},
    mobile:{
        type: String,

                default: "Not set yet"
},
    address:{
        type: String,
            default: "Not set yet"
},
    imageUrl:{
        type: String,
            default: "Not set yet"
},
});

module.exports = mongoose.model("Admin",adminSchema);