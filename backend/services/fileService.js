const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const {
    Document,
    Packer,
    Paragraph
} = require("docx");


// =========================================
// DATA FOLDER
// =========================================

const data = path.join(__dirname, "../data");


// Create data folder if it does not exist
if (!fs.existsSync(data)) {
    fs.mkdirSync(data, { recursive: true });
}


// =========================================
// FILE PATHS
// =========================================

const usersFile = path.join(data, "users.xlsx");
const postsFile = path.join(data, "posts.json");
const wordFile = path.join(data, "blog_posts.docx");


// =========================================
// POSTS - READ
// =========================================

function readPosts() {
    try {
        if (!fs.existsSync(postsFile)) {
            return [];
        }

        const fileData = fs.readFileSync(
            postsFile,
            "utf8"
        );

        if (!fileData.trim()) {
            return [];
        }

        return JSON.parse(fileData);
    } catch (error) {
        console.error(
            "Error reading posts:",
            error.message
        );
        return [];
    }
}


// =========================================
// POSTS - WRITE
// =========================================

function writePosts(posts) {
    try {
        fs.writeFileSync(
            postsFile,
            JSON.stringify(posts, null, 2),
            "utf8"
        );
        return true;
    } catch (error) {

        console.error(
            "Error writing posts:",
            error.message
        );
        return false;
    }
}


// =========================================
// USERS / EXCEL - READ
// =========================================

function readUsers() {
    try {
        if (!fs.existsSync(usersFile)) {
            return [];
        }
        const workbook = XLSX.readFile(usersFile);
        if (!workbook.SheetNames.length) {
            return [];
        }

        const worksheet =
            workbook.Sheets[workbook.SheetNames[0]];
        return XLSX.utils.sheet_to_json(worksheet);
    } catch (error) {
        console.error(
            "Error reading users.xlsx:",
            error.message
        );
        return [];
    }
}


// =========================================
// USERS / EXCEL - WRITE
// =========================================

function writeUsers(users) {
    try {
        const workbook = XLSX.utils.book_new();
        const worksheet =
            XLSX.utils.json_to_sheet(users);

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Users"
        );

        XLSX.writeFile(
            workbook,
            usersFile
        );
        return true;
    } catch (error) {
        console.error(
            "Error writing users.xlsx:",
            error.message
        );
        return false;
    }
}


// =========================================
// BLOG POSTS - WORD EXPORT
// =========================================

async function exportPostsToWord(posts) {
    try {
        const children = [];
        // Document title
        children.push(
            new Paragraph({
                text: "Brrrgrrr Blog Posts",
                heading: "Title"
            })
        );


        // Add every blog post
        posts.forEach(post => {
            children.push(
                new Paragraph({
                    text: post.title,
                    heading: "Heading1"
                }),

                new Paragraph(
                    `Author: ${post.author}`
                ),

                new Paragraph(
                    `Created: ${new Date(
                        post.createdAt
                    ).toLocaleString()}`
                ),

                new Paragraph(
                    post.content
                ),

                new Paragraph("")
            );
        });


        // Create Word document
        const document = new Document({
            sections: [
                {
                    children: children
                }
            ]
        });


        // Convert document to buffer
        const buffer =
            await Packer.toBuffer(document);


        // Save Word document
        fs.writeFileSync(
            wordFile,
            buffer
        );

        console.log(
            "Blog posts exported to:",
            wordFile
        );
        return true;
    } catch (error) {
        console.error(
            "Error exporting blog posts to Word:",
            error.message
        );

        return false;
    }
}


// =========================================
// EXPORT FUNCTIONS
// =========================================

module.exports = {

    readPosts,
    writePosts,

    readUsers,
    writeUsers,

    exportPostsToWord
};