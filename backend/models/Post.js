class Post {

    constructor({
        id,
        title,
        content,
        author,
        authorId,
        createdAt = new Date().toISOString()
    }) {

        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.authorId = authorId;

        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }
}

module.exports = Post;