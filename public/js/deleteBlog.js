async function deleteBlogHandler(event) {
    console.log(`\n Deleting...\n`);
    if(event.target.hasAttribute("blog-id")) {
        const id = event.target.getAttribute("blog-id");

        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            console.log(`Could not delete the blog`);
        }
    }
};