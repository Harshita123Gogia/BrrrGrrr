const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");


// ===============================
// READ / SEARCH POSTS
// ===============================

router.get(
    "/",
    postController.list
);


// ===============================
// CREATE POST
// ===============================

router.post(
    "/",
    authController.verify,
    postController.create
);


// ===============================
// UPDATE POST
// ===============================

router.put(
    "/:id",
    authController.verify,
    postController.update
);


// ===============================
// DELETE POST
// ===============================

router.delete(
    "/:id",
    authController.verify,
    postController.remove
);


module.exports = router;