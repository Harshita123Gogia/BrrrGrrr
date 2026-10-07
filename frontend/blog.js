"use strict";

/* BrrrGrrr blog.js: edit/delete fix v2026-10-07 */

/* =========================================
   BrrrGrrr Blog Application
   ========================================= */

const API = "/api";

const STORAGE_KEYS = {
    token: "blogToken",
    cart: "brrrgrrrCart"
};

const CONFIG = {
    searchDelay: 350,
    requestTimeout: 10000,

    minimumPasswordLength: 6,
    minimumNameLength: 2,

    minimumTitleLength: 3,
    minimumContentLength: 10,

    maximumTitleLength: 120,
    maximumContentLength: 5000,

    toastDuration: 3000
};


/* =========================================
   GLOBAL STATE
========================================= */

let editingId = null;

let postsData = Object.create(null);

let searchDebounceTimer = null;
let toastTimeout = null;

let authLoading = false;
let postSaving = false;
let postsLoading = false;

let postsRequestId = 0;


/* =========================================
   DOM REFERENCES
========================================= */

let nameInput;
let emailInput;
let passwordInput;

let authForm;
let authFormMessage;

let postForm;
let postTitleInput;
let postContentInput;
let postCharacterCount;
let postFormMessage;
let savePostButton;
let resetPostButton;

let searchInput;
let clearSearchButton;
let searchStatus;

let postsContainer;
let postCount;

let cartCountElement;

let authStatusText;
let logoutBtn;
let signupBtn;
let loginBtn;


/* =========================================
   1. DOM INITIALIZATION
========================================= */

function initializeDOMReferences() {

    /* Authentication */
    nameInput = document.getElementById("name");
    emailInput = document.getElementById("email");
    passwordInput = document.getElementById("password");

    authForm = document.getElementById("authForm");
    authFormMessage = document.getElementById("authFormMessage");


    /* Post form */
    postForm = document.getElementById("postForm");
    postTitleInput = document.getElementById("postTitle");
    postContentInput = document.getElementById("postContent");
    postCharacterCount = document.getElementById("postCharacterCount");
    postFormMessage = document.getElementById("postFormMessage");

    savePostButton = document.getElementById("savePostBtn");
    resetPostButton = document.getElementById("resetPostBtn");


    /* Search */
    searchInput = document.getElementById("search");
    clearSearchButton = document.getElementById("clearSearchBtn");
    searchStatus = document.getElementById("searchStatus");


    /* Posts */
    postsContainer = document.getElementById("posts");
    postCount = document.getElementById("postCount");


    /* Cart */
    cartCountElement =
        document.getElementById("cartCount") ||
        document.getElementById("navCartCount");


    /* Authentication UI */
    authStatusText = document.getElementById("authStatusText");
    logoutBtn = document.getElementById("logoutBtn");
    signupBtn = document.getElementById("signupBtn");
    loginBtn = document.getElementById("loginBtn");
}


/* =========================================
   2. GENERAL HELPERS
========================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function getPostId(post) {
    if (!post) {
        return null;
    }

    if (post.id !== undefined && post.id !== null) {
        return String(post.id);
    }

    if (post._id !== undefined && post._id !== null) {
        return String(post._id);
    }

    return null;
}


function getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.token);
}


function setAuthToken(token) {
    if (!token) {
        return;
    }

    localStorage.setItem(
        STORAGE_KEYS.token,
        String(token)
    );
}


function clearAuthToken() {
    localStorage.removeItem(STORAGE_KEYS.token);
}


function isLoggedIn() {
    return Boolean(getAuthToken());
}


function normalizeEmail(email) {
    return String(email || "")
        .trim()
        .toLowerCase();
}


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizeEmail(email)
    );
}


function formatDate(dateValue) {
    if (!dateValue) {
        return "";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


function getAuthorName(post) {
    if (!post) {
        return "Anonymous";
    }

    if (post.author) {
        return String(post.author);
    }

    if (post.authorName) {
        return String(post.authorName);
    }

    if (post.user?.name) {
        return String(post.user.name);
    }

    return "Anonymous";
}


function getErrorMessage(error) {
    if (!error) {
        return "Something went wrong. Please try again.";
    }

    if (error.name === "AbortError") {
        return "The request took too long. Please try again.";
    }

    if (error instanceof TypeError) {
        return "Unable to connect to the server. Please try again";
    }

    return (
        error.message ||
        "Something went wrong. Please try again."
    );
}


function getApiMessage(data, fallback) {
    if (!data) {
        return fallback;
    }

    return (
        data.message ||
        data.error ||
        fallback
    );
}


function getScrollBehavior() {
    return window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        ? "auto"
        : "smooth";
}


/* =========================================
   3. API REQUEST HELPER
========================================= */

async function apiRequest(
    endpoint,
    options = {}
) {

    const controller = new AbortController();

    const timeoutId = setTimeout(
        function() {
            controller.abort();
        },
        CONFIG.requestTimeout
    );

    const headers = new Headers(
        options.headers || {}
    );

    const requestOptions = {
        ...options,
        signal: controller.signal,
        headers
    };


    /*
     * JSON request body.
     */
    if (
        requestOptions.body &&
        typeof requestOptions.body === "object" &&
        !(requestOptions.body instanceof FormData) &&
        !(requestOptions.body instanceof Blob)
    ) {

        requestOptions.body =
            JSON.stringify(requestOptions.body);
    }


    /*
     * Add JSON content type automatically.
     */
    if (
        requestOptions.body &&
        !(requestOptions.body instanceof FormData) &&
        !headers.has("Content-Type")
    ) {

        headers.set(
            "Content-Type",
            "application/json"
        );
    }


    /*
     * Only protected requests receive
     * the authentication token.
     *
     * This prevents public API calls such
     * as GET /posts from being treated as
     * authenticated requests unnecessarily.
     */
    if (options.auth === true) {

        const token = getAuthToken();

        if (token) {

            headers.set(
                "Authorization",
                `Bearer ${token}`
            );
        }
    }


    try {
        const response = await fetch(`${API}${endpoint}`, requestOptions);
        const data = await getResponseData(response);
        return {
            response, data};
    } finally {
        clearTimeout(timeoutId);
    }
}


/* =========================================
   4. RESPONSE PARSER
========================================= */

async function getResponseData(response) {
    const contentType = response.headers.get( "content-type") || "";

    /*
     * Read text first so the app can handle
     * JSON responses even when the server
     * sends an imperfect Content-Type header.
     */
    try {
        const text = await response.text();
        if (!text) {
            return {};
        }
        if ( contentType.includes( "application/json")) {
            try {
                return JSON.parse(text);
            } catch (error) {
                console.warn( "Server returned invalid JSON:", error);
                return {};
            }
        }


        /*
         * Some development servers may forget
         * the JSON content type.
         */
        try {
            return JSON.parse(text);
        } catch {
            return {
                message: text
            };
        }
    } catch (error) {
        console.error( "Unable to read server response:", error);
        return {};
    }
}


/* =========================================
   5. NAVIGATION
========================================= */

function initBlogNavigation() {
    const currentPage = window.location.pathname.split("/").pop() ||"blog.html";
    const navLinks = document.querySelectorAll("nav a, .quick-links-nav a");
    navLinks.forEach(
        function(link) {
            const href = link.getAttribute("href");
            if (!href) {
                return;
            }
            const cleanHref = href.split("#")[0];
            const isBlogLink = cleanHref === "blog.html" || cleanHref.endsWith("/blog.html");
            if (currentPage === "blog.html" && isBlogLink) {
                link.classList.add("active");
                link.setAttribute( "aria-current", "page");
            }

            if (href.startsWith("#")) {
                link.addEventListener("click",
                    function(event) {
                        let target = null;
                        try {
                            target = document.querySelector(href);
                        } catch (error) {
                            console.warn("Invalid navigation target:", href);
                            return;
                        }
                        if (!target) {
                            return;
                        }
                        event.preventDefault();
                        target.scrollIntoView({
                            behavior:
                                getScrollBehavior(),
                            block: "start"
                        });

                        try {
                            history.replaceState(
                                null,
                                "",
                                href
                            );

                        } catch (error) {
                            console.warn(
                                "Unable to update URL:",
                                error
                            );
                        }
                    }
                );
            }
        }
    );
}


/* =========================================
   6. CART COUNT
========================================= */

function updateCartCount() {
    if (!cartCountElement) {
        return;
    }
    try {
        const storedCart = localStorage.getItem( STORAGE_KEYS.cart);
        const cart = storedCart? JSON.parse(storedCart): [];
        if (!Array.isArray(cart)) {
            cartCountElement.textContent = "0";
            return;
        }
        const totalCount = cart.reduce(
                function(sum, item) {
                    const quantity = Number( item?.quantity);
                    if (!Number.isFinite(quantity) || quantity <= 0) {
                        return sum;
                    }
                    return (sum + Math.floor(quantity));
                },
                0
            );

        cartCountElement.textContent = String(totalCount);
    } catch (error) {
        console.error("Unable to read cart:",error);
        cartCountElement.textContent = "0";
    }
}

/* =========================================
   7. STORAGE SYNC
========================================= */

window.addEventListener(
    "storage",
    function(event) {
        if ( event.key === STORAGE_KEYS.cart || event.key === null) {
            updateCartCount();
        }

        if ( event.key === STORAGE_KEYS.token || event.key === null) {
            checkAuthStatus();
        }
    }
);


/* =========================================
   8. AUTHENTICATION UI
========================================= */

function checkAuthStatus() {
    const token = getAuthToken();
    if (token) {
        if (authStatusText) {
            authStatusText.textContent = "You are logged in. You can create and manage your posts.";
        }

        if (logoutBtn) {
            logoutBtn.hidden = false;
        }

        if (signupBtn) {
            signupBtn.hidden = true;
        }

        if (loginBtn) {
            loginBtn.hidden = true;
        }

    } else {
        if (authStatusText) {
            authStatusText.textContent = "Sign up or log in to create and manage your posts.";
        }

        if (logoutBtn) {
            logoutBtn.hidden = true;
        }

        if (signupBtn) {
            signupBtn.hidden = false;
        }

        if (loginBtn) {
            loginBtn.hidden = false;
        }
    }

    updatePostEditorState();
}


function updatePostEditorState() {
    const disabled = postSaving;
    if (postTitleInput) {
        postTitleInput.disabled = disabled;
    }

    if (postContentInput) {
        postContentInput.disabled = disabled;
    }

    if (savePostButton) {
        savePostButton.disabled = disabled;
    }

    if (resetPostButton) {
        resetPostButton.disabled = disabled;
    }
}


/* =========================================
   9. AUTH MESSAGES
========================================= */

function showAuthMessage( message, type = "info") {
    if (!authFormMessage) {
        return;
    }

    authFormMessage.hidden = false;
    authFormMessage.textContent = String(message || "");
    authFormMessage.className =`status-message ${type}`;
    authFormMessage.setAttribute( "role", type === "error"? "alert" : "status");
}

function clearAuthMessage() {
    if (!authFormMessage) {
        return;
    }

    authFormMessage.hidden = true;
    authFormMessage.textContent = "";
    authFormMessage.className ="status-message";
    authFormMessage.removeAttribute("role");
}


/* =========================================
   10. AUTH VALIDATION
========================================= */

function validateSignupFields() {
    const name = nameInput ? nameInput.value.trim(): "";
    const email = emailInput ? normalizeEmail(emailInput.value): "";
    const password = passwordInput ? passwordInput.value: "";
    if (name.length < CONFIG.minimumNameLength) {
        const message = "Please enter your name.";
        showAuthMessage(message, "error");
        showMessage(message, "error");
        nameInput?.focus();
        return false;
    }

    if (!isValidEmail(email)) {
        const message = "Please enter a valid email address.";
        showAuthMessage(message,"error");
        showMessage(message, "error");
        emailInput?.focus();
        return false;
    }

    if (password.length < CONFIG.minimumPasswordLength) {
        const message =`Password must be at least ${CONFIG.minimumPasswordLength} characters.`;
        showAuthMessage(message, "error");
        showMessage(message,"error");
        passwordInput?.focus();
        return false;
    }

    return true;
}


function validateLoginFields() {
    const email = emailInput? normalizeEmail(emailInput.value): "";
    const password = passwordInput? passwordInput.value: "";
    if (!isValidEmail(email)) {
        const message = "Please enter a valid email address.";
        showAuthMessage(message,"error");
        showMessage(message,"error");
        emailInput?.focus();
        return false;
    }


    if (!password) {
        const message = "Please enter your password.";
        showAuthMessage(message,"error");
        showMessage(message,"error");
        passwordInput?.focus();
        return false;
    }
    return true;
}


/* =========================================
   11. AUTH BUTTON LOADING
========================================= */

function rememberButtonMarkup(button) {
    if (!button) {
        return;
    }
    if (!button.dataset.defaultMarkup) {
        button.dataset.defaultMarkup = button.innerHTML;
    }
}

function restoreButtonMarkup(button) {
    if (!button ||!button.dataset.defaultMarkup) {
        return;
    }

    button.innerHTML = button.dataset.defaultMarkup;
}


function setAuthButtonsLoading(isLoading, activeAction = "") {
    authLoading = isLoading;
    [signupBtn, loginBtn, logoutBtn].forEach(rememberButtonMarkup);
    if (signupBtn) {
        signupBtn.disabled = isLoading;
        if (isLoading && activeAction === "signup") {
            signupBtn.innerHTML = `<span class="button-spinner" aria-hidden="true"></span>Creating Account...`;
        }
        if (!isLoading) {
            restoreButtonMarkup(signupBtn);
        }
    }

    if (loginBtn) {
        loginBtn.disabled = isLoading;
        if (isLoading && activeAction === "login") {
            loginBtn.innerHTML = `<span class="button-spinner" aria-hidden="true"></span>Logging In...`;
        }

        if (!isLoading) {
            restoreButtonMarkup(loginBtn);
        }
    }


    if (logoutBtn) {
        logoutBtn.disabled = isLoading;
    }
}


/* =========================================
   12. SIGN UP
========================================= */

async function signup() {
    if (authLoading) {
        return;
    }

    clearAuthMessage();

    if (!validateSignupFields()) {
        return;
    }

    const name =nameInput.value.trim();
    const email =normalizeEmail(emailInput.value);

    const password =passwordInput.value;

    setAuthButtonsLoading(true,"signup");

    try {
        const {response,data} =
        await apiRequest("/auth/signup",
                {
                    method: "POST",
                    body: {
                        name, email, password
                    }
                }
            );

        if (!response.ok) {
            const errorMessage = getApiMessage(data,"Signup failed. Please try again.");
            showAuthMessage(errorMessage,"error");
            showMessage(errorMessage,"error");
            return;
        }


        const successMessage = "Successfully signed up! Your account has been created. You can now log in.";
        showAuthMessage(successMessage,"success");
        showMessage("Account created successfully!","success");


        /*
         * Never retain the password.
         */
        if (nameInput) {
            nameInput.value = "";
        }

        if (emailInput) {
            emailInput.value = email;
        }

        if (passwordInput) {
            passwordInput.value = "";
        }


        setTimeout(
            function() {
                passwordInput?.focus();
            },
            150
        );

    } catch (error) {
        console.error("Signup error:",error);
        const errorMessage =getErrorMessage(error);
        showAuthMessage(errorMessage,"error");
        showMessage(errorMessage,"error");
    } finally {
        setAuthButtonsLoading(false);
    }
}


/* =========================================
   13. LOGIN
========================================= */

async function login() {
    if (authLoading) {
        return;
    }

    clearAuthMessage();

    if (!validateLoginFields()) {
        return;
    }


    const email = normalizeEmail(emailInput.value);
    const password = passwordInput.value;

    setAuthButtonsLoading(true,"login");
    try {
        const {response,data} =
            await apiRequest(
                "/auth/login",
                {
                    method: "POST",
                    body: {email,password
                    }
                }
            );

        if (!response.ok) {
            const errorMessage = getApiMessage(data,"Invalid email or password.");
            showAuthMessage(errorMessage,"error");
            showMessage(errorMessage,"error");
            return;
        }


        /*
         * Backend should return a JWT.
         */
        if (!data.token) {
            const errorMessage =data.message || "Login failed. No authentication token was returned by the server.";
            showAuthMessage(errorMessage,"error");
            showMessage(errorMessage,"error");
            return;
        }


        setAuthToken(data.token);
        checkAuthStatus();
        const successMessage ="Login successful! Welcome back to BrrrGrrr.";
        showAuthMessage(successMessage,"success");
        showMessage("Login successful!","success");

        /*
         * Never retain password.
         */
        if (passwordInput) {
            passwordInput.value = "";
        }


        /*
         * Refresh posts.
         */
        await loadPosts();

    } catch (error) {

        console.error("Login error:",error);
        const errorMessage = getErrorMessage(error);
        showAuthMessage(errorMessage,"error");
        showMessage(errorMessage,"error");
    } finally {
        setAuthButtonsLoading(false);
    }
}


/* =========================================
   14. LOGOUT
========================================= */

function logout() {
    clearAuthToken();
    editingId = null;
    resetForm({
        clearMessage: true
    });
    checkAuthStatus();
    showAuthMessage(
        "You have been logged out successfully.",
        "success"
    );

    showMessage(
        "Logged out successfully.",
        "success"
    );
    loadPosts();
}


/* =========================================
   15. UNAUTHORIZED RESPONSE
========================================= */

function handleUnauthorized() {
    clearAuthToken();
    editingId = null;
    resetForm({
        clearMessage: true
    });
    checkAuthStatus();
    showAuthMessage(
        "Your session has expired. Please log in again.",
        "error"
    );

    showMessage(
        "Your session has expired. Please log in again.",
        "error"
    );
}


/* =========================================
   16. AUTH EVENTS
========================================= */

function initializeAuthEvents() {
    if (signupBtn) {
        signupBtn.addEventListener("click",function(event) {
                event.preventDefault();
                signup();
            }
        );
    }


    if (loginBtn) {
        loginBtn.addEventListener("click",function(event) {
                event.preventDefault();
                login();
            }
        );
    }


    if (logoutBtn) {
        logoutBtn.addEventListener("click",function(event) {
                event.preventDefault();
                logout();
            }
        );
    }

    if (authForm) {
        authForm.addEventListener("submit",function(event) {
                event.preventDefault();
                login();
            }
        );


        authForm.addEventListener("keydown",function(event) {
                if (event.key !== "Enter") {
                    return;
                }


                if (event.target.tagName ==="BUTTON") {
                    return;
                }

                if (event.target === emailInput || event.target === passwordInput) {
                    event.preventDefault();
                    login();
                }
            }
        );
    }
}


/* =========================================
   17. LOAD BLOG POSTS
========================================= */

async function loadPosts() {
    if (!postsContainer) {
        return;
    }

    const requestId = ++postsRequestId;
    const query =searchInput? searchInput.value.trim(): "";
    postsLoading = true;
    setPostsLoading(true);
    try {
        const endpoint =`/posts?search=${encodeURIComponent(query)}`;
        const {
            response, data} = await apiRequest(endpoint);


        /*
         * Ignore stale search responses.
         */
        if ( requestId !== postsRequestId) {
            return;
        }


        if (response.status === 401 || response.status === 403) {
            throw new Error(
                getApiMessage(data,"The blog server rejected the request.")
            );
        }


        if (!response.ok) {
            throw new Error(
                getApiMessage(data,"Unable to load posts.")
            );
        }


        const posts = Array.isArray(data.posts)? data.posts: Array.isArray(data)? data: [];
        postsData =Object.create(null);
        const validPosts = [];
        posts.forEach(function(post) {
                const postId =getPostId(post);
                if (postId === null) {
                    return;
                }

                postsData[postId] = post;
                validPosts.push({post,postId});
            }
        );


        updatePostCount(validPosts.length);
        if (query) {
            updateSearchStatus(validPosts.length? `${validPosts.length} post${validPosts.length === 1 ? "" : "s"} found`: "No posts found");
        } else {
            updateSearchStatus(validPosts.length? `Showing ${validPosts.length} post${validPosts.length === 1 ? "" : "s"}`: "No posts yet");
        }

        if (validPosts.length === 0) {
            renderEmptyPosts(query);
            return;
        }


        postsContainer.innerHTML = validPosts
                .map(function({post,postId}) {
                        return renderPostCard(post,postId);
                    }
                )
                .join("");

        postsContainer.setAttribute("aria-busy","false");
    } catch (error) {
        if (
            requestId !== postsRequestId
        ) {
            return;
        }

        console.error("Load posts error:",error);
        updatePostCount(0);
        updateSearchStatus("Unable to load posts");
        renderPostsError(error);
    } finally {
        if (requestId === postsRequestId) {
            postsLoading = false;
            postsContainer?.setAttribute( "aria-busy", "false");
        }
    }
}


/* =========================================
   18. POST CARD
========================================= */

function renderPostCard(post,postId) {
    const title = post.title || "Untitled Post";
    const content = post.content || "";
    const author = getAuthorName(post);
    const date = formatDate(post.createdAt || post.updatedAt);
    return `<article class="blog-card post-card" data-post-id="${escapeHTML(postId)}">
            <div class="post-card-top">
                <div class="post-category-icon" aria-hidden="true">
    <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=85"
        alt=""
        class="post-burger-image">
</div>
<div class="post-meta">
<span class="post-author"> By ${escapeHTML(author)}</span>
${
date ? `<span class="post-date" aria-label="Published ${escapeHTML(date)}">${escapeHTML(date)}</span>`: ""
}
</div>
</div>
<h3 class="post-title"> ${escapeHTML(title)}</h3>
<p class="post-text"> ${escapeHTML(content)}</p>
<div class="post-card-footer">
<div class="post-buttons">
<button type="button" class="btn edit-post-btn" data-post-id="${escapeHTML(postId)}" aria-label="Edit ${escapeHTML(title)}">
<i class="fas fa-pen" aria-hidden="true"></i> Edit</button>
<button type="button" class="btn secondary delete-post-btn" data-post-id="${escapeHTML(postId)}" aria-label="Delete ${escapeHTML(title)}">
<i class="fas fa-trash" aria-hidden="true"></i> Delete</button>
</div>
</div>
</article>`;
}


/* =========================================
   19. POSTS LOADING STATE
========================================= */

function setPostsLoading(isLoading) {
    if (!postsContainer) {
        return;
    }


    postsContainer.setAttribute("aria-busy", isLoading ? "true" : "false");
    if (!isLoading) {
        return;
    }
    
    
    postsContainer.innerHTML = `<div class="loading-state" role="status" aria-live="polite">
    <div class="loading-spinner" aria-hidden="true"></div>
            <p> Loading posts... </p></div>`;
}


/* =========================================
   20. POST ERROR STATE
========================================= */

function renderPostsError(error) {
    if (!postsContainer) {
        return;
    }


    const message = getErrorMessage(error);

    postsContainer.innerHTML = `<div class="error-state" role="alert">
            <div class="error-icon" aria-hidden="true"> ⚠️</div>
            <h3> Unable to load posts </h3>
            <p> ${escapeHTML(message)} </p>
            <button type="button" class="btn" id="retryPostsBtn">
                <i class="fas fa-rotate-right" aria-hidden="true"></i> Try Again </button></div>`;

    document.getElementById("retryPostsBtn") ?.addEventListener( "click", loadPosts);
    postsContainer.setAttribute( "aria-busy", "false");
}


/* =========================================
   21. EMPTY POST STATES
========================================= */

function renderEmptyPosts(query = "") {
    if (!postsContainer) {
        return;
    }


    if (query) {
        postsContainer.innerHTML = `<div class="empty-state">
                <div class="empty-state-icon" aria-hidden="true"> 🔍</div>
                <h3> No matching posts </h3>
                <p> We couldn't find any posts matching"${escapeHTML(query)}".</p>
                <button type="button" class="btn" id="clearEmptySearchBtn"> Clear Search</button></div>`;

        document.getElementById("clearEmptySearchBtn") ?.addEventListener("click", clearSearch);
    } else {
        postsContainer.innerHTML = `<div class="empty-state">
                <div class="empty-state-icon" aria-hidden="true"> 🍔 </div>
                <h3> No posts yet</h3>
                <p> Be the first to share a burger story with the BrrrGrrr community.</p>
                <a href="#create-post-title" class="btn"> Write the First Post</a>
            </div>
        `;
    }


    postsContainer.setAttribute("aria-busy","false");
}


/* =========================================
   22. POST COUNT
========================================= */

function updatePostCount(count) {
    if (!postCount) {
        return;
    }


    const numericCount = Number(count);
    const safeCount = Number.isFinite(numericCount) ? Math.max( 0, Math.floor(numericCount)): 0;

    postCount.textContent =`${safeCount} post${safeCount === 1 ? "" : "s"}`;
}


/* =========================================
   23. SEARCH STATUS
========================================= */

function updateSearchStatus(message) {
    if (!searchStatus) {
        return;
    }


    searchStatus.textContent = String(message || "");
}


/* =========================================
   24. POST FORM VALIDATION
========================================= */

function validatePostForm() {
    const title = postTitleInput ? postTitleInput.value.trim() : "";
    const content = postContentInput ? postContentInput.value.trim() : "";
    if ( title.length < CONFIG.minimumTitleLength) {
        showFormMessage("Please enter a meaningful post title.","error");
        postTitleInput?.focus();
        return false;
    }


    if ( title.length > CONFIG.maximumTitleLength) {
        showFormMessage( `Post title cannot exceed ${CONFIG.maximumTitleLength} characters.`, "error");
        postTitleInput?.focus();
        return false;
    }


    if ( content.length < CONFIG.minimumContentLength) {
        showFormMessage( "Please write a little more content before publishing.", "error");
        postContentInput?.focus();
        return false;
    }


    if ( content.length > CONFIG.maximumContentLength) {
        showFormMessage(`Post content cannot exceed ${CONFIG.maximumContentLength} characters.`,"error");
        postContentInput?.focus();
        return false;
    }


    return true;
}


/* =========================================
   25. CREATE / UPDATE POST
========================================= */

async function savePost(event) {
    if (event) {
        event.preventDefault();
    }


    if (postSaving) {
        return;
    }


    const token = getAuthToken();


    if (!token) {
        showFormMessage("Please log in before creating or editing a post.","error");
        showMessage("Please log in first.","error");
        emailInput?.focus();
        return;
    }


    if (!validatePostForm()) {
        return;
    }


    const title = postTitleInput.value.trim();
    const content = postContentInput.value.trim();
    const isEditing = editingId !== null;
    const endpoint = isEditing ? `/posts/${encodeURIComponent(editingId)}`: "/posts";
    const method = isEditing ? "PUT" : "POST";
    setPostSaving(true);

    try {
        const {
            response, data} =
            await apiRequest( endpoint,
                {
                    method,
                    auth: true,

                    body: {
                        title,
                        content
                    }
                }
            );


        if (response.status === 401 ||  response.status === 403) {
            handleUnauthorized();
            return;
        }


        if (!response.ok) {
            const message = getApiMessage( data, "Unable to save the post.");
            showFormMessage(message, "error");
            showMessage(message,"error");
            return;
        }


        const successMessage =
            getApiMessage(data,isEditing ? "Post updated successfully." : "Post published successfully.");

        resetForm({clearMessage: false});
        showFormMessage(successMessage,"success");
        showMessage(successMessage, "success");

        await loadPosts();

        const postsSection = document.querySelector(".posts-section");

        if (postsSection) {
            postsSection.scrollIntoView({
                behavior:
                    getScrollBehavior(),
                block: "start"
            });
        }

    } catch (error) {
        console.error("Save post error:",error);
        const message =getErrorMessage(error);
        showFormMessage(message,"error");
        showMessage(message,"error");
    } finally {
        setPostSaving(false);
    }
}


/* =========================================
   26. POST SAVE LOADING
========================================= */

function setPostSaving(isSaving) {
    postSaving = isSaving;
    updatePostEditorState();
    if (!savePostButton) {
        return;
    }


    if (isSaving) {
        rememberButtonMarkup(savePostButton);
        savePostButton.innerHTML = `<span class="button-spinner" aria-hidden="true"></span> Saving...`;
        savePostButton.setAttribute("aria-busy","true");
    } else {
        savePostButton.removeAttribute("aria-busy");
        updateSaveButtonText();
    }
}


/* =========================================
   27. EDIT POST
========================================= */

function editPost(id) {
    const postId = String(id);
    const post = postsData[postId];
    if (!post) {
        showMessage("Post could not be found.", "error");
        return;
    }


    if (!isLoggedIn()) {
        showMessage("Please log in first.", "error");
        return;
    }


    editingId = postId;
    if (postTitleInput) {
        postTitleInput.value = post.title || "";
    }


    if (postContentInput) {
        postContentInput.value = post.content || "";
    }


    updateCharacterCount();
    updateSaveButtonText();

    showFormMessage("You are editing this post. Update the content and save your changes.", "info");
    if (postTitleInput) {
        postTitleInput.focus();
        postTitleInput.scrollIntoView({
            behavior:
                getScrollBehavior(),
            block: "center"
        });
    }
}


/* =========================================
   28. SAVE BUTTON TEXT
========================================= */

function updateSaveButtonText() {
    if (!savePostButton) {
        return;
    }


    if (editingId !== null) {
        savePostButton.innerHTML = `<i class="fas fa-pen" aria-hidden="true"></i> Update Post`;
    } else {
        savePostButton.innerHTML = `<i class="fas fa-paper-plane" aria-hidden="true"></i> Create Post`;
    }
}


/* =========================================
   29. DELETE POST
========================================= */

async function deletePost(id) {
    const token = getAuthToken();
    if (!token) {
        showMessage("Please log in first.", "error");
        return;
    }


    const postId = String(id);
    const post = postsData[postId];
    if (!post) {
        showMessage("Post could not be found.", "error");
        return;
    }


    const title = post.title || "this post";
    const confirmed = window.confirm(`Delete "${title}"?\n\nThis action cannot be undone.`);
    if (!confirmed) {
        return;
    }

    try {
        const {
            response, data} =
            await apiRequest(
                `/posts/${encodeURIComponent(postId)}`,
                {
                    method: "DELETE",
                    auth: true
                }
            );


        if (response.status === 401 || response.status === 403) {
            handleUnauthorized();
            return;
        }


        if (!response.ok) {
            const message = getApiMessage(data,"Unable to delete the post.");
            showMessage(message,"error");
            return;
        }


        if (editingId !== null && String(editingId) === postId) {
            resetForm();
        }


        showMessage(getApiMessage(data, "Post deleted successfully."),"success");
        await loadPosts();
    } catch (error) {
        console.error("Delete post error:",error);
        showMessage(getErrorMessage(error),"error"
        );
    }
}


/* =========================================
   30. RESET POST FORM
========================================= */

function resetForm(options = {}) {
    const {
        clearMessage = true
    } = options;


    editingId = null;

    if (postTitleInput) {
        postTitleInput.value = "";
    }


    if (postContentInput) {
        postContentInput.value = "";
    }

    updateCharacterCount();
    updateSaveButtonText();

    if (clearMessage) {
        clearFormMessage();
    }
}


/* =========================================
   31. CHARACTER COUNT
========================================= */

function updateCharacterCount() {
    if (!postCharacterCount) {
        return;
    }


    const length = postContentInput ? postContentInput.value.length : 0;
    postCharacterCount.textContent =`${length} / ${CONFIG.maximumContentLength}`;
    const isOverLimit = length > CONFIG.maximumContentLength;
    postCharacterCount.classList.toggle("character-limit",isOverLimit);
    postCharacterCount.setAttribute("aria-live", "polite");
}


/* =========================================
   32. POST FORM EVENTS
========================================= */

function initializePostForm() {
    if (postForm) {
        postForm.addEventListener("submit", savePost);
    }


    if (resetPostButton) {
        resetPostButton.addEventListener(
            "click",
            function(event) {
                event.preventDefault();
                resetForm();
                showFormMessage("Post form has been reset.", "info");
            }
        );
    }


    if (postContentInput) {
        postContentInput.addEventListener("input", updateCharacterCount);
    }


    if (postTitleInput) {
        postTitleInput.addEventListener("input", function() {
                if (postFormMessage && postFormMessage.classList.contains("error")) {
                    clearFormMessage();
                }
            }
        );
    }

    updateCharacterCount();
}


/* =========================================
   33. POST EVENTS
========================================= */

function initializePostEvents() {
    if (!postsContainer) {
        return;
    }

    /*
     * Posts are rendered dynamically, so use event delegation.
     * This is the single source of truth for Edit/Delete clicks.
     * It does not depend on inline onclick attributes.
     */
    postsContainer.addEventListener("click", function(event) {
        const button = event.target.closest(".edit-post-btn, .delete-post-btn");

        if (!button || !postsContainer.contains(button)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const postId = button.getAttribute("data-post-id");

        if (!postId) {
            showMessage("This post does not have a valid ID.", "error");
            return;
        }

        if (button.classList.contains("edit-post-btn")) {
            editPost(postId);
            return;
        }

        if (button.classList.contains("delete-post-btn")) {
            deletePost(postId);
        }
    });
}


/* =========================================
   34. SEARCH
========================================= */

function initializeSearch() {
    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function() {

            updateClearSearchButton();

            clearTimeout(searchDebounceTimer);
            const query = searchInput.value.trim();
            if (query) {
                updateSearchStatus(`Searching for "${query}"...`);
            } else {
                updateSearchStatus("Showing all posts...");
            }


            searchDebounceTimer =
                setTimeout(
                    function() {
                        loadPosts();
                    },
                    CONFIG.searchDelay
                );
        }
    );


    searchInput.addEventListener(
        "keydown",
        function(event) {
            if (event.key === "Escape") {
                clearSearch();
            }
        }
    );


    if (clearSearchButton) {
        clearSearchButton.addEventListener("click", clearSearch);
    }

    updateClearSearchButton();
}


/* =========================================
   35. SEARCH CLEAR BUTTON
========================================= */

function updateClearSearchButton() {
    if (!clearSearchButton) {
        return;
    }


    const hasSearch =
        Boolean(searchInput && searchInput.value.trim());

    clearSearchButton.hidden = !hasSearch;
    clearSearchButton.setAttribute("aria-hidden", hasSearch ? "false" : "true");
}


/* =========================================
   36. CLEAR SEARCH
========================================= */

function clearSearch() {
    if (!searchInput) {
        return;
    }


    searchInput.value = "";
    updateClearSearchButton();

    clearTimeout(searchDebounceTimer);
    updateSearchStatus("Showing all posts...");
    loadPosts();
    searchInput.focus();
}


/* =========================================
   37. POST FORM MESSAGES
========================================= */

function showFormMessage(message, type = "info") {
    if (!postFormMessage) {
        return;
    }

    postFormMessage.hidden = false;
    postFormMessage.textContent = String(message || "");
    postFormMessage.className =`status-message ${type}`;
    postFormMessage.setAttribute("role", type === "error" ? "alert" : "status");
}


function clearFormMessage() {
    if (!postFormMessage) {
        return;
    }

    postFormMessage.hidden = true;
    postFormMessage.textContent = "";
    postFormMessage.className ="status-message";
    postFormMessage.removeAttribute("role");
}


/* =========================================
   38. TOAST NOTIFICATIONS
========================================= */

function showMessage(message, type = "success") {
    if (!document.body) {
        return;
    }


    let toast = document.getElementById("toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id ="toast-notification";
        toast.className ="toast-notification";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.setAttribute("aria-atomic", "true");
        document.body.appendChild(toast);
    }

    clearTimeout(toastTimeout);
    toast.className =`toast-notification ${type}`;
    toast.textContent = String(message || "");
    requestAnimationFrame(
        function() {
            toast.classList.add("show");
        }
    );


    toastTimeout =
        setTimeout(
            function() {
                toast.classList.remove("show");
            },
            CONFIG.toastDuration
        );
}


/* =========================================
   39. KEYBOARD SHORTCUTS
========================================= */

function initializeKeyboardShortcuts() {
    document.addEventListener(
        "keydown",
        function(event) {
            const activeElement =document.activeElement;
            if (event.key === "/" && activeElement?.tagName !== "INPUT" && activeElement?.tagName !== "TEXTAREA" && activeElement?.tagName !== "SELECT" && !activeElement?.isContentEditable) {
                if (searchInput) {
                    event.preventDefault();
                    searchInput.focus();
                }
            }
        }
    );
}


/* =========================================
   40. CART NAVIGATION
========================================= */

function initializeCartNavigation() {
    const cartLinks = document.querySelectorAll('a[href*="cart"], .cart-link');
    cartLinks.forEach(
        function(link) {
            link.addEventListener(
                "click",
                function() {
                    updateCartCount();
                }
            );
        }
    );
}


/* =========================================
   41. PAGE VISIBILITY SYNC
========================================= */

function initializeVisibilitySync() {
    document.addEventListener(
        "visibilitychange",
        function() {
            if (document.visibilityState ==="visible") {
                updateCartCount();
                checkAuthStatus();
            }
        }
    );
}


/* =========================================
   42. AUTHENTICATION STATE CHECK
========================================= */

async function verifyExistingSession() {

    /*
     * No separate /me request is made because
     * the current backend contract does not
     * define one.
     *
     * Protected operations automatically
     * detect an expired/invalid token.
     */
}


/* =========================================
   43. GLOBAL FUNCTIONS
========================================= */

window.signup = signup;
window.login = login;
window.logout = logout;

window.savePost = savePost;
window.resetForm = resetForm;

window.editPost = editPost;
window.deletePost = deletePost;

window.clearSearch = clearSearch;
window.loadPosts = loadPosts;

window.showMessage = showMessage;


/* =========================================
   44. APPLICATION INITIALIZATION
========================================= */

function initializeBlog() {

    /*
     * Get DOM references first.
     */
    initializeDOMReferences();


    /*
     * Navigation.
     */
    initBlogNavigation();


    /*
     * Cart.
     */
    updateCartCount();
    initializeCartNavigation();


    /*
     * Authentication.
     */
    checkAuthStatus();
    initializeAuthEvents();


    /*
     * Blog editor.
     */
    initializePostForm();


    /*
     * Search.
     */
    initializeSearch();


    /*
     * Post buttons.
     */
    initializePostEvents();


    /*
     * Keyboard accessibility.
     */
    initializeKeyboardShortcuts();


    /*
     * Keep the page synchronized when
     * the user switches browser tabs.
     */
    initializeVisibilitySync();


    /*
     * Load current posts.
     */
    loadPosts();


    /*
     * Check existing authentication state.
     */
    verifyExistingSession();
}


/* =========================================
   GLOBAL POST ACTIONS
========================================= */

/* Explicitly expose these functions for dynamically rendered buttons. */
window.editPost = editPost;
window.deletePost = deletePost;


/* =========================================
   45. START APPLICATION
========================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeBlog);
} else {
    initializeBlog();
}