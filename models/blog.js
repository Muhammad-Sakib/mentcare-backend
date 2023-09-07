const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId
},
    postTitle:{
type:String,
            default: "Not set yet"
},
    postDescription:{
type:String,
            default: "Not set yet"
},
    postImg:{
type:String,
            default: "Not set yet"
},
});

module.exports = mongoose.model("Blog",blogSchema);