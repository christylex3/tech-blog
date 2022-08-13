const router = require("express").Router();
const { Blog, User } = require("../models");
// const loginAuth = require("../utils");


// GET all blogs and the name of users
router.get("/", async (req, res) => {
    try {
        // Finds all blogs and includes the name of the users
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                }
            ],
        })

        // Serializes data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Renders the serialized data into a template
        res.render("homepage", {
            blogs,
            // logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: Add in login authentication