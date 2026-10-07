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

            const text =
                `${post.title} ${post.content} ${post.author}`
                    .toLowerCase();

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

        authorId: String(req.user.id)
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
        post => String(post.id) === String(req.params.id)
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Post not found"
        });
    }

    const post = posts[index];


    // ==========================================
    // CHECK POST OWNERSHIP
    // ==========================================

    const hasAuthorId =
        post.authorId !== undefined &&
        post.authorId !== null &&
        String(post.authorId).trim() !== "";


    let isOwner = false;


    if (hasAuthorId) {

        // Normal/current posts
        isOwner =
            String(post.authorId) ===
            String(req.user.id);

    } else {

        // Backward compatibility for older posts
        // that were created before authorId existed.
        isOwner =
            String(post.author || "")
                .trim()
                .toLowerCase() ===
            String(req.user.name || "")
                .trim()
                .toLowerCase();
    }


    if (!isOwner) {

        return res.status(403).json({
            message: "Not your post"
        });
    }


    // ==========================================
    // REPAIR OLD POST
    // ==========================================

    // If this was an older post without authorId,
    // save the current user's ID so future
    // update/delete operations work normally.
    if (!hasAuthorId) {

        post.authorId =
            String(req.user.id);
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

    post.updatedAt =
        new Date().toISOString();


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
        item =>
            String(item.id) ===
            String(req.params.id)
    );


    if (!post) {

        return res.status(404).json({
            message: "Post not found"
        });
    }


    // ==========================================
    // CHECK POST OWNERSHIP
    // ==========================================

    const hasAuthorId =
        post.authorId !== undefined &&
        post.authorId !== null &&
        String(post.authorId).trim() !== "";


    let isOwner = false;


    if (hasAuthorId) {

        // Normal/current posts
        isOwner =
            String(post.authorId) ===
            String(req.user.id);

    } else {

        // Backward compatibility for older posts
        // that do not contain authorId.
        isOwner =
            String(post.author || "")
                .trim()
                .toLowerCase() ===
            String(req.user.name || "")
                .trim()
                .toLowerCase();
    }


    if (!isOwner) {

        return res.status(403).json({
            message: "Not your post"
        });
    }


    // ==========================================
    // DELETE THE POST
    // ==========================================

    const updatedPosts =
        posts.filter(
            item =>
                String(item.id) !==
                String(req.params.id)
        );


    // Save remaining posts
    writePosts(updatedPosts);


    // Update Word document
    exportPostsToWord(updatedPosts);


    return res.json({

        message: "Post deleted successfully."
    });
};