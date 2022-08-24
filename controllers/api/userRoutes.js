const router = require("express").Router();
const { User } = require("../../models");

// router.get("/", (req, res) => {
// 	// If the user is already logged in, redirect the request to another route
// 	if (req.session.logged_in) {
// 		res.redirect("/");
// 		return;
// 	}

// 	res.render("signup");
// });

// Creating a new user
router.post("/", async (req, res) => {
	try {
		const userData = await User.create(req.body);

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { username: req.body.username },
		});

		if (!userData) {
			res.status(400).json({
				message: "Incorrect username or password, please try again",
			});
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({
				message: "Incorrect username or password, please try again",
			});
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData, message: "You are now logged in!" });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post("/signup", async (req, res) => {
	try {

		const userData = await User.create({
			email: req.body.email,
			password: req.body.password,
		});

		console.log(userData);
		// const userData = await User.findOne({
		// 	where: { username: req.body.username },
		// });

		if (!userData) {
			res.status(400).json({
				message: "User cannot be created",
			});
			return;
		}

		req.session.save(() => {
			console.log("Saving");
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			// res.redirect("/");

			res.json({ user: userData, message: "You are now logged in!" });
			
		});
	} catch (err) {
		res.status(400).json(err);
		console.log(err);
	}
	
});

router.post("/logout", (req, res) => {
	console.log("trying to log out");
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
			console.log("Successfully logged out");
			// res.redirect("/");
		});
	} else {
		res.status(404).end();
	}
});




module.exports = router;
