const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogs');


//create blog detail
router.route('/createblog/').post(blogController.createBlog);

//get blog detail
router.route('/blogdetail/:blogid').get(blogController.blogDetail);

//get all blog list
router.route('/allbloglist/').get(blogController.allBlogList);

module.exports = router;