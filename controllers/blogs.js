const BlogModel = require('../models/blog')


const createBlog = async(req,res)=>{
    try {
        var blogDetail = req.body;
            const newBlog =  new BlogModel(blogDetail);
            const result = await newBlog.save();
                    console.log(result);
                    res.send({
                        "status": true,
                        "message" : "Blog created successfully",
                        }
                        )
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}


const blogDetail = async(req,res)=>{
    try {
        const blogId = req.params.blogid;
        const result = await BlogModel.findOne({_id: blogId});
        console.log(result);
        if (result != null) {
            res.send(result)
    }
    else{
        res.send({ 
            "status": false,
            "message" : "Blog not found",
    })
    }
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}

const allBlogList = async(req,res)=>{
    try {

            const blogList = await BlogModel.find().select({ __v:0});
            if(blogList.length >0){
            console.log(blogList);
            res.send(blogList);
        } else {
            res.send({
                "status": false,
                "message" : "Blogs not found.",
        })
        }
    } catch (error) {
        res.send({ 
            "status": false,
            "message" : error.message,
    })
    }
}


module.exports = {createBlog, blogDetail, allBlogList};