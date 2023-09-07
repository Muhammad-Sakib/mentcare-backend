const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        uid:{
            type: mongoose.Schema.Types.ObjectId,
},
        name:{
            type: String,
                    default: "Not set yet"
},
        email:{
            type: String,
            unique: true,
                    default: "Not set yet"
},
       password:{
        type: String,

                   default: "Not set yet"
},
        mobile:{
            type:String,
            unique: true,
                    default: "Not set yet"
},
       title:{
        type: String,

                   default: "Not set yet"
},
       aboutMe: {
        type: String,
                   default: "Not set yet"
},
       education:{
        type:Array,
                   default: "Not set yet"
},
       workExperience:{
        type:Array,
                   default: "Not set yet"
},
        address:{
            type: String,
                    default: "Not set yet"
},
      price:{
        type: String,

                  default: "Not set yet"
},
    imageUrl:{
        type: String,
                default: "Not set yet"
},
    }
);

module.exports = mongoose.model("Doctor",doctorSchema);