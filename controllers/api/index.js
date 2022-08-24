const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const createBlogRoutes = require("./createBlogRoutes");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/createBlog", createBlogRoutes);

module.exports = router;