function createBlogHandler(event) {
    
    document.location.replace("/api/createBlog");
    event.preventDefault();

    var blogName = document.querySelector("#blog-name").value.trim();
    var blogBody = document.querySelector("#blog-body").value.trim();


}