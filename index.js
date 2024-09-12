import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

function validatePost(post) {
    const errors = [];
    if (!post.category) {
      errors.push("Category is required.");
    }
    if (!post.title) {
      errors.push("Title is required.");
    }
    if (!post.content) {
      errors.push("Content is required.");
    }
    // Add more validation checks as needed
    return errors;
  }

app.get("/", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/create", (req, res) => {
    res.render("create-post.ejs");
});

app.post('/submit', (req, res) => {

    const newPost = {
      id: Date.now(),
      category: req.body["category"],
      title: req.body["title"],
      content: req.body["content"],
    };

    const errors = validatePost(newPost);
    if (errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        // Add the new post to the posts array
        posts.push(newPost);
    
        res.render("create-post.ejs", { message: 'Your Post has been submitted successfully 👌' });
    }
});

app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);

    if (post) {
        res.render("edit-post.ejs", {post});
    } else {
        res.status(404).send('Postingan tidak ditemukan');
    }
})

app.post("/edit-submit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === id);
    const {category, title, content} = req.body;

    if (postIndex === -1) {
        res.status(404).send('Gagal mengupdate post');
    } else {
        posts[postIndex] = {id, category, title, content};
        console.log(id, category, title, content);
        console.log(posts);
        // res.render("index.ejs", { message: 'post updated successfully', posts})
        res.redirect("/");
    }
});

app.get("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex === -1) {
        res.status(404).send("Gagal menghapus post");
    } else {
        posts.splice(postIndex, 1);
        res.redirect("/");
    }

});

app.get("/postingan/:id", (req, res) => {
    const postId = Number(req.params.id);
    const post = posts.find(post => post.id === postId);
    console.log(post);
    
    if (!post) {
        res.status(404).send('Post tidak ditemukan');
    } else {
        res.render("show-post.ejs", {post});
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/education", (req, res) => {
    const category = "Education";
    const postEdu = posts.filter(post => post.category === category);

    if (!postEdu) {
        res.status(404).send("Post Edukasi tidak ditemukan");
    } else {
        res.render("show-each-post.ejs", {posts: postEdu, category});
    }
});

app.get("/motive", (req, res) => {
    const category = "Motivation"
    const postMotive = posts.filter(post => post.category === category);

    if (!postMotive) {
        res.status(404).send("Post motivasi tidak ditemukan");
    } else {
        res.render("show-each-post.ejs", {posts: postMotive, category});
    }
});

app.get("/poem", (req, res) => {
    const category = "Poem";
    const postPoem = posts.filter(post => post.category === category);

    if (!postPoem) {
        res.status(404).send("Post puisi tidak ditemukan");
    } else {
        res.render("show-each-post.ejs", {posts: postPoem, category});
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}. Please open http://localhost:${port}/ in your browser.`)
})