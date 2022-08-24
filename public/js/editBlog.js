// Directs user to edit form
async function directToForm(event) {
    const id = event.target.getAttribute("blog-id");
    document.location.replace(`/api/blogs/${id}/edit`);
}

// Edits blog
async function editBlogHandler(event) {
    event.preventDefault();

    const name = document.querySelector("#blog-name").value.trim();
    const body = document.querySelector("#blog-body").value.trim();

    if(name && body) {
        const id = event.target.getAttribute("blog-id");
        const response = await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name, body }),
            headers: { "Content-Type": "application/json" },
            
        });

        // Return to dashboard when successfully edited blog
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            console.log(`Could not edit the blog`);
        }
    }
    
};