const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// ==================== MIDDLEWARE ====================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files from public folder
app.use(express.static(path.join(__dirname, "public")));

// ==================== API ROUTES ====================

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// ==================== HEALTH CHECK ====================

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Brrrgrrr Blog API running"
    });
});

// ==================== FRONTEND ROUTE ====================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==================== 404 HANDLER ====================

app.use((req, res) => {
    res.status(404).json({
        status: "ERROR",
        message: "Route not found"
    });
});

// ==================== ERROR HANDLER ====================

app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(500).json({
        status: "ERROR",
        message: "Internal server error"
    });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});