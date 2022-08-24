async function loginHandler(event) {
	event.preventDefault();

	const username = document.querySelector("#username-login").value.trim();
	const password = document.querySelector("#password-login").value.trim();
	
    // TODO: Fix id to be unique
    const user_id = 1;


	console.log(username);
	console.log(password);
    // Grabs input values from login
	const response = await fetch(`/api/users/login`, {
		method: "POST",
		body: JSON.stringify({
			username,
            password,
			user_id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

    // Refers back to homepage
	if (response.ok) {
		document.location.replace("/");
	}
}

async function signUpHandler(event) {
	event.preventDefault();

	const username = document.querySelector("#username-signup").value.trim();
	const password = document.querySelector("#password-signup").value.trim();
	
    // TODO: Fix id to be unique
    // const user_id = 1;


	console.log(username);
	console.log(password);
    // Grabs input values from login
	const response = await fetch(`/api/users/signup`, {
		method: "POST",
		body: JSON.stringify({
			username,
            password,
			// user_id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		// TODO: Fix where logout button shows up instead of login without refresh
		document.location.replace("/");
	}
}


function toggleSignupHandler(event) {
	event.preventDefault();

    const loginForm = document.querySelector(".login-form");
    loginForm.style.display = "none";

    const signupForm = document.querySelector(".signup-form");
    signupForm.style.display = "block";
}

function toggleLoginHandler(event) {
	event.preventDefault();

    const loginForm = document.querySelector(".login-form");
    loginForm.style.display = "block";

    const signupForm = document.querySelector(".signup-form");
    signupForm.style.display = "none";
}

