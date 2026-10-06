const Post = require("../models/Post");
const {
    readPosts,
    writePosts,
    exportPostsToWord
} = require("../services/fileService");


// ===============================
// GET / SEARCH POSTS
// ===============================
exports.list = (req, res) => {
    let posts = readPosts();
    const search =
        (req.query.search || "").trim().toLowerCase();
    // Search by title, content or author
    if (search) {
        posts = posts.filter(post => {
            const text =`${post.title} ${post.content} ${post.author}`.toLowerCase();
            return text.includes(search);
        });
    }

    return res.json({
        posts: posts
    });
};


// ===============================
// CREATE POST
// ===============================
exports.create = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content required"
        });
    }

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
        return res.status(400).json({
            message: "Title and content required"
        });
    }

    const posts = readPosts();

    // Create Post object
    const post = new Post({
        id: Date.now().toString(),
        title: cleanTitle,
        content: cleanContent,
        author: req.user.name,
        authorId: req.user.id
    });

    // Add newest post at beginning
    posts.unshift(post);

    // Save JSON data
    writePosts(posts);

    // Export all posts to Word
    exportPostsToWord(posts);

    return res.status(201).json({
        message: "Post created",
        post: post
    });
};


// ===============================
// UPDATE POST
// ===============================
exports.update = (req, res) => {
    const posts = readPosts();
    const index = posts.findIndex(
        post => post.id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const post = posts[index];

    // Only post owner can update
    if (post.authorId !== req.user.id) {
        return res.status(403).json({
            message: "Not your post"
        });
    }

    const newTitle =
        req.body.title !== undefined
            ? req.body.title.trim()
            : post.title;

    const newContent =
        req.body.content !== undefined
            ? req.body.content.trim()
            : post.content;

    if (!newTitle || !newContent) {
        return res.status(400).json({
            message: "Title and content required"
        });
    }

    post.title = newTitle;
    post.content = newContent;
    post.updatedAt = new Date().toISOString();

    // Save updated post
    writePosts(posts);

    // Update Word document
    exportPostsToWord(posts);

    return res.json({
        message: "Post updated",
        post: post
    });
};


// ===============================
// DELETE POST
// ===============================
exports.remove = (req, res) => {
    const posts = readPosts();
    const post = posts.find(
        item => item.id === req.params.id
    );

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    // Only post owner can delete
    if (post.authorId !== req.user.id) {
        return res.status(403).json({
            message: "Not your post"
        });
    }

    const updatedPosts = posts.filter(
        item => item.id !== req.params.id
    );

    // Save remaining posts
    writePosts(updatedPosts);

    // Update Word document
    exportPostsToWord(updatedPosts);

    return res.json({
        message: "Post deleted"
    });
};