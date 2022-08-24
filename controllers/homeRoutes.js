const router = require("express").Router();
const { Blog, User } = require("../models");
const loginAuth = require("../utils/auth");

// GET all blogs and the name of users
router.get("/", async (req, res) => {
	try {
		// Finds all blogs and includes the name of the users
		const blogData = await Blog.findAll({
			// include: [
			// 	{
			// 		model: User,
			// 		attributes: ["name"],
			// 	},
			// ],
		});
		console.log(req.session);
		// Serializes data so the template can read it
		const blogs = blogData.map((blog) => blog.get({ plain: true }));

		// Renders the serialized data into a template
		res.render("homepage", {
			blogs,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/blogs/:id", async (req, res) => {
	try {
		const blogData = await Blog.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ["name"],
				},
			],
		});

		const blog = blogData.get({ plain: true });

		res.render("blog", {
			...blog,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});


// Use loginAuth middleware to prevent access to route
router.get("/dashboard", loginAuth, async (req, res) => {
	try {
	// Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [{ model: Blog }],
		});

		const user = userData.get({ plain: true });

		res.render('dashboard', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect("/dashboard");
		return;
	}

	res.render("login");
});



module.exports = router;

// TODO: Add in login authentication
