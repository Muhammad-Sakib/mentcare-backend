const VolunteerModel = require('../models/volunteer')


const registerVolunteer = async(req,res)=>{
    try {
    const volunteerData = req.body;
            const newVolunteer =  new VolunteerModel(volunteerData);
            const result = await newVolunteer.save();
                    console.log(result);
                    res.send({
                        "status": true,
                        "message" : "Link created successfully",
                        }
                        )
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}

const joinInstantCall = async(req,res)=>{

    try {
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        await VolunteerModel.updateMany(
            {
                status: true,       // Find documents with status true
                starttime: { $lte: oneHourAgo }, // Created time is greater than or equal to 1 hour ago
              },
              { $set: { status: false } });

        const searchedVolunteer = await VolunteerModel.findOne({status:true});
        console.log(searchedVolunteer);

        const volunteerId = searchedVolunteer._id;
        const result = await VolunteerModel.findOneAndUpdate({_id: volunteerId},{status:false});
        console.log(result);
        if (result != null) {
            res.send({ 
                "status": true,
                "message" : "Instant call available",
                "meetLink": result.meetLink
        })
        } else {
            res.send({ 
                "status": false,
                "message" : "No one available",
        })
        }
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : "No one available",
    })
    }
}

const allVolunteerList = async(req,res)=>{
    try {

            const volunteerList = await VolunteerModel.find().select({ __v:0});
            if(volunteerList.length >0){
            console.log(volunteerList);
            res.send(volunteerList);
        } else {
            res.send({
                "status": false,
                "message" : "No volunteer found.",
        })
        }
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}

module.exports = {registerVolunteer, joinInstantCall, allVolunteerList};