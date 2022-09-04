const express = require("express");
const router = express.Router();
const Blog = require("../model/blog");
const blogsController = require("../controllers/blog_controller");

router.get("/", blogsController.getAllBlogs);
router.post("/", blogsController.addBlog);
router.put("/:id", blogsController.updateBlog);
router.delete("/:id", blogsController.deleteBlog);

module.exports = router;

