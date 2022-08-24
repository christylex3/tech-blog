const router = require("express").Router();
const Blog = require("../../models/Blog");

router.get("/", (req, res) => {
    try {
        res.render("createBlog");
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;