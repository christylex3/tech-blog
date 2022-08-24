const router = require("express").Router();
const { Blog, User } = require("../../models");
const loginAuth = require("../../utils/auth.js");

// TODO: Add in login authentication

// Creates a new blog
router.post("/", loginAuth, async (req, res) => {
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

// Gets a specific blog by id and includes the name of the user
router.get("/:id", async (req, res) => {
    try {
        // Finds the blog by id and includes the name of the user
        const blogData = await Blog.findByPk(req.params.id, {
            // include: [
            //     {
            //         model: User,
            //         attributes: ["username"],
            //     },
            // ],
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

// Updates a blog
router.put("/:id", async (req, res) => {
	try {
		Blog.update(
			{
				// All the fields you can update in the blog
				name: req.body.name,
                body: req.body.body,
			},
			{
				// Gets the blog based on its id given in the request parameters
				where: {
					id: req.params.id,
				},
			}
		)
		.then((updatedBlog) => {
			// Sends the updated blog as a json response
			res.json(updatedBlog);
		})
		.catch((err) => res.json(err));
	} catch (err){
		res.status(500).json(err);
	}
});

// Deletes the blog with that id
router.delete("/:id", loginAuth, async (req, res) => {
	try {
		const blogData = await Blog.destroy({
			where: {
				id: req.params.id,
                user_id: req.session.user_id,
			},
		});
		if (!blogData) {
			res.status(404).json({
				message: "No blog found with that id!",
			});
			return;
		}
		res.status(200).json(blogData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;