const router = require("express").Router();
const { User } = require("../../models");

// router.get("/signup", async (req, res) => {
//     try {

//     } catch (err) {
//         res.status(400).json(err);
//     }
//     res.render("signup", {
// 		signup,
// 		// logged_in: req.session.logged_in
// 	});
// });


router.get("/", (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect("/");
		return;
	}

	res.render("signup");
});


router.post("/signup", async (req, res) => {
	try {
		const userData = await User.create();

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(400).json(err);
	}

	res.render("signup", {
		signup,
		// logged_in: req.session.logged_in
	});
});


module.exports = router;