const mongoose = require('mongoose');
const connectDb = (url)=>{
    mongoose.connect(url,{useNewUrlParser: true, 
        useUnifiedTopology: true}).then(()=>{
        console.log('db connected!');
    }).catch((error)=>{console.log(error)});
}

module.exports = connectDb;