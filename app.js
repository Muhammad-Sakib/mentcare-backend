require('dotenv').config();
const express = require('express');
const db = require('./db/connect');
const cors = require('cors');

const app = express();

app.use(cors({
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200
}));

const port = 3002;
const admins_routes = require('./routes/admins');
const appointments_routes = require("./routes/appointments");
const blogs_routes = require("./routes/blogs");
const doctors_routes = require("./routes/doctors");
const patients_routes = require("./routes/patients");
const volunteers_routes = require("./routes/volunteers");


// parse application/json
app.use(express.json());

//middleware
app.use("/api/admins",admins_routes);
app.use("/api/appointments",appointments_routes);
app.use("/api/blogs",blogs_routes);
app.use("/api/doctors",doctors_routes);
app.use("/api/patients",patients_routes);
app.use("/api/volunteers",volunteers_routes);

const start = async () =>{
    try {
        await db(process.env.DB_URL);
        app.listen(port,()=>{
            console.log(`server started to ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
};

start();