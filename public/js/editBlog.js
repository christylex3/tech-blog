async function directToForm(event) {
    const id = event.target.getAttribute("blog-id");
    document.location.replace(`/api/blogs/${id}/edit`);
}

async function editBlogHandler(event) {
    event.preventDefault();
    console.log(`\nEditing...\n`);

    const name = document.querySelector("#blog-name").value.trim();
    const body = document.querySelector("#blog-body").value.trim();
    console.log(event);
    console.log(event.target);
    if(name && body) {
        const id = event.target.getAttribute("blog-id");
        console.log(id);

        const response = await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name, body }),
            headers: { "Content-Type": "application/json" },
            
        });
        // const response = await fetch(`/api/blogs/${id}`, requestOptions);
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            console.log(`Could not edit the blog`);
        }
    }
    
};