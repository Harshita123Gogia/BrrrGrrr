const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

const {
    readUsers,
    writeUsers
} = require("../services/fileService");
const SECRET = "brrrgrrr_demo_secret";


// ===============================
// PASSWORD HASHING
// ===============================
function hash(password) {
    return crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
}

// ===============================
// SIGN UP
// ===============================
exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password.trim()) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const users = readUsers();
    // Check duplicate email
    const existingUser = users.find(
        user => user.email.toLowerCase() === cleanEmail
    );

    if (existingUser) {
        return res.status(409).json({
            message: "Email already registered"
        });
    }

    // Create User object
    const user = new User({
        id: Date.now().toString(),
        name: cleanName,
        email: cleanEmail,
        password: hash(password)
    });

    // Save user
    users.push(user);
    writeUsers(users);
    return res.status(201).json({
        message: "Signup successful"
    });
};


// ===============================
// LOGIN
// ===============================
exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = readUsers();
    const user = users.find(
        u =>
            u.email.toLowerCase() === cleanEmail &&
            u.password === hash(password)
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // Create JWT token
    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email
        },
        SECRET,
        {
            expiresIn: "2h"
        }
    );

    return res.json({
        message: "Login successful",
        token: token
    });
};


// ===============================
// AUTHENTICATION MIDDLEWARE
// ===============================
exports.verify = (req, res, next) => {
    try {
        const authorization =
            req.headers.authorization || "";
        if (!authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const token = authorization.substring(7);
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};