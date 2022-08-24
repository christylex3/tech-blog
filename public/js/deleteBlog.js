async function deleteBlogHandler(event) {
    console.log(`\n Deleting...\n`);
    console.log(event);
    console.log(event.target);
    if(event.target.hasAttribute("blog-id")) {
        const id = event.target.getAttribute("blog-id");
        console.log(id);
        console.log(`\nInside of if condition\n`);

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