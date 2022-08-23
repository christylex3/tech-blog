async function loginHandler(event) {
	event.preventDefault();

	const username = document.querySelector("#username").value.trim();
	const password = document.querySelector("#password").value.trim();
	
    // TODO: Fix id to be unique
    const user_id = 1;

    // Grabs input values from login
	const response = await fetch(`/api/login`, {
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

