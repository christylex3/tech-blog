async function createBlogHandler(event) {
    event.preventDefault();

    // Grabs values from input
    const name = document.querySelector("#blog-name").value.trim();
    const body = document.querySelector("#blog-body").value.trim();

    if (name && body) {
        const response = await fetch(`/api/blogs`, {
            method: `POST`,
            body: JSON.stringify({ name, body }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        // Return to dashboard when successfully created blog
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            console.log("Failed to create a blog");
        }
    }
};