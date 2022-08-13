const router = require("express").Router();
const { Blog, User } = require("../../models");
// const loginAuth = require("../../utils");

// TODO: Add in login authentication


// Creates a new blog
router.post("/", async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        // When blog is successfully created
        res.status(200).json(newBlog);

    } catch (err) {
        res.status(400).json(err);
    }
});

// GET a specific blog by id and includes the name of the user
router.get("/:id", async (req, res) => {
    try {
        // Finds the blog by id and includes the name of the user
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });

        // Serializes data so the template can read it
        const blog = blogData.get({ plain: true });

        // Renders...
        res.render("blog", {
            ...blog,
            // logged_in: req.session.logged_in
        });

        // If blog with the id does not exist, inform user
        if (!blogData) {
			res.status(404).json({
				message: "No blog found with that id!",
			});
			return;
		}

    } catch (err) {
        res.status(500).json(err);
    }
});