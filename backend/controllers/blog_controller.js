const Blog = require("../model/blog");
const moment = require('moment')

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find({});
  } catch (err) {
    console.log(err);
  }

  if (!blogs) {
    return res.status(404).json({ message: "No blogs found" });
  }
  return res.status(200).json({ blogs });
};

const addBlog = async (req, res, next) => {
  const { title, content, author } = req.body;
  let blog;
  let createdDate = moment().format().split("T")[0];
  try {
    blog = new Blog({
        title, 
        content, 
        author,
        createdDate,
    });
    await blog.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).send({status: "Success"});
};

const updateBlog = async (req, res, next) => {
  const id = req.params.id;
  const { title, content, author, createdDate, updatedDate } = req.body;
  let blog = await Blog.findById(id)
  if(!blog){
    return res.status(404).send({message : "Id not valid"})
  }
  if(blog.title && blog.title !== title){
    blog.title = title;
  }
  if(blog.content && blog.content !== content){
    blog.content = content;
  }
  if(blog.author && blog.author !== author){
    blog.author = author
  }
  blog.updatedDate = moment().format().split("T")[0]
  blog = await blog.save();
  
  if (!blog) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ blog });
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Blog Successfully Deleted" });
};

exports.getAllBlogs = getAllBlogs;
exports.addBlog = addBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;