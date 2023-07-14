const PostSchema = require("../models/post.js");

const createPosts = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    res.status(201).json({
      newPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find(req.body);
    res.status(200).json({
      getPosts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPost = await PostSchema.findById(id);
    res.status(201).json({
      detailPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      updatePost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const newPost = await PostSchema.findByIdAndRemove(id);
    res.status(201).json({ message: "Silme isleminiz basarili...." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  const { search, tag } = req.query;
  try {
    const title = new RegExp(search, "i");

    const posts = await PostSchema.find({
      $or: [{ title }],
      tag: { $in: tag.split(",") },
    });
    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPosts, getDetail, getPosts, getUpdate, deletePost, searchPost };
