const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const signupRoutes = require("./signupRoutes");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/signup", signupRoutes);

module.exports = router;