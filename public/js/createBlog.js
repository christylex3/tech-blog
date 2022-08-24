async function createBlogHandler(event) {
    console.log("Am I showing up here?");
    
    // document.location.replace("/api/createBlog");
    event.preventDefault();
    console.log("Am I showing up here too?");

    const blogName = document.querySelector("#blog-name").value.trim();
    const blogBody = document.querySelector("#blog-body").value.trim();

    if (blogName && blogBody) {
        const response = await fetch(`/api/blogs`, {
            method: `POST`,
            // body: JSON.stringify({ name: blogName, body: blogBody }),
            body: JSON.stringify({ blogName, blogBody }),
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