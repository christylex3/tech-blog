async function createBlogHandler(event) {
    console.log("Am I showing up here?");
    
    // document.location.replace("/api/createBlog");
    event.preventDefault();
    console.log("Am I showing up here too?");

    const name = document.querySelector("#blog-name").value.trim();
    const body = document.querySelector("#blog-body").value.trim();

    if (name && body) {
        const response = await fetch(`/api/blogs`, {
            method: `POST`,
            // body: JSON.stringify({ name: blogName, body: blogBody }),
            body: JSON.stringify({ name, body }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        console.log(response);
        if (response.ok) {
            console.log("CREATED A BLOG!!!!***********");
            document.location.replace("/dashboard");
            
        } else {
            console.log("Failed to create a blog");
        }
    }
};