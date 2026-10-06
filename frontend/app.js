/* =========================================
BRRRGRRR - BURGER APPLICATION
Professional Front-End Application Logic
========================================= */

/* =========================================
BURGER PRODUCTS
========================================= */

const products = [
    {
        id: 1,
        name: "Farm Spicy Chicken Burger",
        price: 199,
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80",
        isVeg: false,
        categories: ["Non-Beef Burgers"],
        desc: "A perfectly spiced chicken patty dressed in tandoori sauce, creamy mayo and chilli sauce."
    },
    {
        id: 2,
        name: "Crispy Chilli Cheese",
        price: 129,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        isVeg: true,
        categories: ["Traditional & Core Burgers"],
        desc: "A golden, crunchy vegetable patty topped with melted cheese and a spicy chilli kick."
    },
    {
        id: 3,
        name: "Ranch Fried Chicken",
        price: 189,
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80",
        isVeg: false,
        categories: ["Non-Beef Burgers"],
        desc: "Crispy fried chicken topped with ranch dressing, lettuce and tomatoes in a toasted bun."
    },
    {
        id: 4,
        name: "Kachori Masala Burger",
        price: 166,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        isVeg: true,
        categories: ["Traditional & Core Burgers"],
        desc: "A unique vegetarian burger inspired by the street food flavors of Rajasthan."
    },
    {
        id: 5,
        name: "Veg Makhani Burst Burger",
        price: 169,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80",
        isVeg: true,
        categories: ["American-Style Burgers"],
        desc: "Crispy vegetable patty topped with onions and rich, creamy Indian-style makhani sauce."
    },
    {
        id: 6,
        name: "Mexican Three Bean Burger",
        price: 249,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80",
        isVeg: true,
        categories: ["American-Style Burgers"],
        desc: "A plant-based patty made from a blend of three different beans."
    },
    {
        id: 7,
        name: "Farm Grilled Chicken",
        price: 179,
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80",
        isVeg: false,
        categories: ["Non-Beef Burgers"],
        desc: "Grilled chicken layered with harissa sauce, onions and fresh lettuce."
    },
    {
        id: 8,
        name: "Paprika Grilled Chicken",
        price: 299,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80",
        isVeg: false,
        categories: ["Specialty & Gourmet Burgers"],
        desc: "Chicken patty layered with spicy sauces, onions and tomatoes."
    },
    {
        id: 9,
        name: "Spicy Veg Cajun Burger",
        price: 249,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80",
        isVeg: true,
        categories: ["Specialty & Gourmet Burgers"],
        desc: "A Cajun-spiced vegetable patty with garden vegetables, pickles and cheddar cheese."
    },
    {
        id: 10,
        name: "Grilled Chicken Burger (Double Patty)",
        price: 359,
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80",
        isVeg: false,
        categories: ["Non-Beef Burgers"],
        desc: "A double chicken patty with charred onions, lettuce, signature sauce and pickles."
    },
    {
        id: 11,
        name: "Crisp Tease Chicken Burger",
        price: 349,
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80",
        isVeg: false,
        categories: ["Non-Beef Burgers"],
        desc: "Crunchy chicken tenders with vegetables, cheddar cheese and spicy mayo."
    },
    {
        id: 12,
        name: "Monster Veg Burger",
        price: 399,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        isVeg: true,
        categories: ["Traditional & Core Burgers"],
        desc: "Two Cajun-spiced vegetable patties with garden vegetables, pickles and cheddar cheese."
    }
];


/* =========================================
BURGER CATEGORY DATA
========================================= */

const burgerTypes = [
    {
        id: 1,
        name: "Traditional & Core Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
        items: [
            {
                title: "Classic Hamburger",
                desc: "A seasoned ground beef patty served on a bun with lettuce, tomato, onion and classic condiments."
            },
            {
                title: "Cheeseburger",
                desc: "The classic hamburger upgraded with melted American, cheddar or Swiss cheese."
            },
            {
                title: "Double / Triple Burger",
                desc: "Multiple stacked patties and extra cheese for a hearty meal."
            }
        ]
    },
    {
        id: 2,
        name: "American-Style Burgers",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
        items: [
            {
                title: "Smash Burger",
                desc: "A ground beef ball pressed flat on a hot griddle to create thin, crispy edges."
            },
            {
                title: "Juicy Lucy",
                desc: "A burger with cheese stuffed inside the patty so it melts while cooking."
            },
            {
                title: "Slider",
                desc: "A miniature burger, traditionally served in groups for snacking or sampling."
            }
        ]
    },
    {
        id: 3,
        name: "Non-Beef Burgers",
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80",
        items: [
            {
                title: "Chicken Burger",
                desc: "Grilled or crispy fried chicken paired with mayo or coleslaw."
            },
            {
                title: "Turkey Burger",
                desc: "A leaner, milder poultry alternative to beef."
            },
            {
                title: "Seafood Burger",
                desc: "A patty crafted from fish such as salmon or tuna."
            },
            {
                title: "Veggie & Plant-Based Burger",
                desc: "A non-meat patty made from beans, lentils, mushrooms or plant-based alternatives."
            }
        ]
    },
    {
        id: 4,
        name: "Specialty & Gourmet Burgers",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
        items: [
            {
                title: "BBQ Bacon Burger",
                desc: "Topped with smoky bacon, onion rings and barbecue sauce."
            },
            {
                title: "Mushroom Swiss Burger",
                desc: "Layered with sautéed mushrooms and melted Swiss cheese."
            },
            {
                title: "Spicy Burger",
                desc: "Infused with jalapeños, hot sauce or Cajun spices."
            },
            {
                title: "Gourmet / Craft Burger",
                desc: "Uses upscale ingredients like brioche buns, blue cheese or truffle mayo."
            }
        ]
    }
];


/* =========================================
BURGER INGREDIENTS
========================================= */

const ingredients = [
    {
        id: "cheese",
        name: "Cheese",
        price: 25,
        stock: 10,
        isVeg: true
    },
    {
        id: "doubleCheese",
        name: "Extra Cheese",
        price: 35,
        stock: 15,
        isVeg: true
    },
    {
        id: "tomato",
        name: "Tomato",
        price: 15,
        stock: 20,
        isVeg: true
    },
    {
        id: "onion",
        name: "Onion",
        price: 25,
        stock: 20,
        isVeg: true
    },
    {
        id: "boiledPotatoes",
        name: "Boiled Potatoes",
        price: 25,
        stock: 20,
        isVeg: true
    },
    {
        id: "lettuce",
        name: "Lettuce",
        price: 10,
        stock: 20,
        isVeg: true
    },
    {
        id: "cucumber",
        name: "Cucumber",
        price: 10,
        stock: 20,
        isVeg: true
    },
    {
        id: "jalapeno",
        name: "Jalapeño",
        price: 20,
        stock: 12,
        isVeg: true
    },
    {
        id: "mayonnaise",
        name: "Mayonnaise",
        price: 15,
        stock: 18,
        isVeg: true
    },
    {
        id: "mushroom",
        name: "Grilled Mushroom",
        price: 30,
        stock: 15,
        isVeg: true
    },
    {
        id: "patty",
        name: "Extra Patty",
        price: 60,
        stock: 15,
        isVeg: false
    },
    {
        id: "paneer",
        name: "Paneer Patty",
        price: 55,
        stock: 15,
        isVeg: true
    },
    {
        id: "chicken",
        name: "Crispy Chicken",
        price: 70,
        stock: 12,
        isVeg: false
    },
    {
        id: "bbq",
        name: "BBQ Sauce",
        price: 20,
        stock: 20,
        isVeg: true
    },
    {
        id: "sauce",
        name: "Special Sauce",
        price: 15,
        stock: 25,
        isVeg: true
    },
    {
        id: "mincedChicken",
        name: "Minced Chicken",
        price: 100,
        stock: 25,
        isVeg: false
    },
    {
        id: "mutton",
        name: "Mutton",
        price: 100,
        stock: 15,
        isVeg: false
    },
    {
        id: "soySauce",
        name: "Soy Sauce",
        price: 40,
        stock: 25,
        isVeg: false
    }
];


/* =========================================
APPLICATION SETTINGS
========================================= */

const CART_KEY = "brrrgrrrCart";
const INVENTORY_KEY = "brrrgrrrInventory";

const DELIVERY_FEE = 40;
const FREE_DELIVERY_THRESHOLD = 499;
const TAX_RATE = 0.05;

const CUSTOM_BURGER_BASE_PRICE = 80;


/* =========================================
APPLICATION STATE
========================================= */

let cart = [];
let selectedIngredients = {};
let inventory = {};

let activeCategory = "all";
let menuSearchQuery = "";

let menuGrid = null;
let burgerCategoriesGrid = null;
let ingredientList = null;

let customPrice = null;
let customSummary = null;
let customName = null;

let cartCount = null;
let cartItems = null;
let cartTotal = null;

let clearCartButton = null;
let addCustomButton = null;

let contactForm = null;
let checkoutForm = null;

let toastTimeout = null;


/* =========================================
HTML ESCAPING
========================================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================
NUMBER HELPERS
========================================= */

function getSafeNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}


function getSafeQuantity(value, fallback = 1) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return fallback;
    }

    return Math.max(1, Math.floor(number));
}


function formatCurrency(value) {
    return `₹${Math.round(
        getSafeNumber(value, 0)
    ).toLocaleString("en-IN")}`;
}


/* =========================================
GENERATE UNIQUE CART ID
========================================= */

function generateCartId() {
    return `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}`;
}


/* =========================================
INVENTORY INITIALIZATION
========================================= */

function initializeInventory() {
    try {
        const savedInventory = localStorage.getItem(INVENTORY_KEY);

        if (!savedInventory) {
            const initialInventory = {};
            ingredients.forEach(item => {
                initialInventory[item.id] = Math.max(
                    0,
                    Math.floor(
                        getSafeNumber(
                            item.stock,
                            0
                        )
                    )
                );
            });

            localStorage.setItem(
                INVENTORY_KEY,
                JSON.stringify(initialInventory));

            return initialInventory;
        }

        const parsedInventory = JSON.parse(savedInventory);

        if (!parsedInventory || typeof parsedInventory !== "object" || Array.isArray(parsedInventory)) {
            throw new Error("Invalid inventory data");
        }

        ingredients.forEach(item => {
            if (typeof parsedInventory[item.id] !== "number" || !Number.isFinite(parsedInventory[item.id])) {
                parsedInventory[item.id] =
                    Math.max(
                        0,
                        Math.floor(getSafeNumber(item.stock,0))
                    );
            }

            parsedInventory[item.id] =
                Math.max(
                    0,
                    Math.floor(parsedInventory[item.id])
                );
        });

        localStorage.setItem(
            INVENTORY_KEY,
            JSON.stringify(parsedInventory)
        );

        return parsedInventory;

    } catch (error) {
        console.warn("Unable to load inventory. Resetting inventory:", error);

        const initialInventory = {};

        ingredients.forEach(item => {
            initialInventory[item.id] =
                Math.max(
                    0,
                    Math.floor(
                        getSafeNumber(
                            item.stock,
                            0
                        )
                    )
                );
        });

        try {
            localStorage.setItem(
                INVENTORY_KEY,
                JSON.stringify(initialInventory));
        } catch (storageError) {
            console.warn("Unable to save initial inventory:", storageError);
        }

        return initialInventory;
    }
}


/* =========================================
SAVE INVENTORY
========================================= */

function saveInventory() {
    try {
        localStorage.setItem(
            INVENTORY_KEY,
            JSON.stringify(inventory));
    } catch (error) {
        console.warn("Unable to save inventory:",error);
    }
}


/* =========================================
GET CURRENT INGREDIENT STOCK
========================================= */

function getIngredientStock(id) {
    const ingredient =
        ingredients.find(item => item.id === id);

    if (!ingredient) {
        return 0;
    }

    if (typeof inventory[id] !== "number" || !Number.isFinite(inventory[id])) {
        inventory[id] = Math.max(
            0,
            Math.floor(
                getSafeNumber(
                    ingredient.stock,
                    0
                )
            )
        );
    }

    return Math.max(
        0,
        Math.floor(inventory[id]));
}


/* =========================================
LOAD CART SAFELY
========================================= */

function loadCart() {
    try {
        const savedCart =
            JSON.parse(
                localStorage.getItem(
                    CART_KEY
                ) || "[]"
            );

        if (!Array.isArray(savedCart)) {
            return [];
        }

        return savedCart
            .filter(item => {
                return (item && typeof item.name === "string" && item.name.trim() !== "" && Number.isFinite(Number(item.price)));
            })
            .map(item => {
                const normalizedItem = {
                    id: item.id || generateCartId(),

                    name:
                        String(item.name),

                    price:
                        Math.max(
                            0,
                            getSafeNumber(item.price)),

                    quantity:
                        getSafeQuantity(item.quantity),

                    isCustom:
                        Boolean(item.isCustom)
                };

                if (
                    Array.isArray(item.ingredients)) {
                    normalizedItem.ingredients = item.ingredients
                            .map(
                                ingredient => {
                                    if (ingredient && typeof ingredient === "object") {
                                        return {
                                            id: String(ingredient.id || ""),
                                            name: String(ingredient.name || ""),
                                            quantity: getSafeQuantity(ingredient.quantity,1),
                                            price:
                                                Math.max(
                                                    0,
                                                    getSafeNumber(ingredient.price,0))
                                        };
                                    }

                                    return String(ingredient);
                                }
                            )
                            .filter(Boolean);
                }

                return normalizedItem;
            });

    } catch (error) {
        console.warn("Unable to load saved cart:", error);
        return [];
    }
}


/* =========================================
INITIALIZE APPLICATION STATE
========================================= */

function initializeApplicationState() {
    inventory = initializeInventory();
    cart = loadCart();
}


/* =========================================
INITIALIZE DOM REFERENCES
========================================= */

function initializeDOMReferences() {
    menuGrid = document.querySelector("#menuGrid");
    burgerCategoriesGrid = document.querySelector("#BurgersList");
    ingredientList = document.querySelector("#ingredientList");
    customPrice = document.querySelector("#customPrice");
    customSummary = document.querySelector("#customSummary");
    customName = document.querySelector("#customName");
    cartCount = document.querySelector("#cartCount");
    cartItems = document.querySelector("#cartItems");
    cartTotal = document.querySelector("#cartTotal");
    clearCartButton = document.querySelector("#clearCart");
    addCustomButton = document.querySelector("#addCustom");
    contactForm = document.querySelector("#contactForm");
    checkoutForm = document.querySelector("#checkoutForm");
}


/* =========================================
NAVIGATION
========================================= */

function navigateTo(sectionId, clickedElement = null) {
    if (sectionId === "burgers") {
        sectionId = "menu";
    }

    const target = document.getElementById(sectionId);

    if (!target) {
        console.warn(`Section "${sectionId}" was not found.`);

        return false;
    }

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {
            item.classList.remove("active");
        });

    if (clickedElement) {
        clickedElement.classList.add("active");
    } else {
        const navItem =
            document.querySelector(`.nav-item[href="#${sectionId}"]`);

        if (navItem) {
            navItem.classList.add("active");
        }
    }

    history.replaceState(null,"",`#${sectionId}`);

    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    return false;
}

window.navigateTo = navigateTo;


/* =========================================
NAVIGATION LINK HANDLING
========================================= */

function initializeNavigationLinks() {
    const navigationLinks =
        document.querySelectorAll('.nav-links a[href^="#"]');

    navigationLinks.forEach(link => {
        link.addEventListener(
            "click",
            event => {
                const href =
                    link.getAttribute("href");

                if (!href || href === "#") {
                    return;
                }

                const sectionId = href.substring(1);

                if (document.getElementById( sectionId)) {
                    event.preventDefault();

                    navigateTo(sectionId,link);
                }
            }
        );
    });
}


/* =========================================
FILTER + SEARCH PRODUCTS
========================================= */

function getFilteredProducts() {
    let filteredProducts =
        activeCategory === "all"
            ? [...products]
            : products.filter(
                product => Array.isArray(product.categories) && product.categories.includes(activeCategory));

    const query = menuSearchQuery.trim().toLowerCase();

    if (query) {
        filteredProducts =
            filteredProducts.filter(
                product => {
                    const searchableText = [product.name,product.desc,...(product.categories || [])]
                        .join(" ")
                        .toLowerCase();

                    return searchableText.includes(query);
                }
            );
    }

    return filteredProducts;
}


/* =========================================
RENDER PRODUCTS
========================================= */

function renderProducts(category = activeCategory) {
    if (!menuGrid) {
        return;
    }

    activeCategory = category || "all";
    const filteredProducts = getFilteredProducts();
    const menuStatus = document.querySelector("#menuStatus");
    if (menuStatus) {
        menuStatus.textContent =
            filteredProducts.length
                ? `${filteredProducts.length} burger${filteredProducts.length === 1 ? "" : "s"} available`
                : "No burgers match your search.";
    }

    if (!filteredProducts.length) {
        menuGrid.innerHTML = `
            <div class="card empty-state">
                <div class="empty-state-icon">
    <img
        src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=85"
        alt="Burger"
        class="empty-burger-image"
    >
</div>
                <h3>No burgers found</h3>
                <p>Try another search or choose a different category.</p>
                <button type="button" class="btn secondary" onclick="clearMenuSearch()"> Clear Search</button></div>`;

        return;
    }

    menuGrid.innerHTML =
        filteredProducts
            .map(product => {
                const foodType =
                    product.isVeg
                        ? `
                            <span class="food-type veg" aria-hidden="true"></span>Veg
                        `
                        : `
                            <span class="food-type non-veg" aria-hidden="true"></span>Non-Veg
                        `;

                const category = product.categories?.[0] || "Burger";
                return `
                    <article class="card product-card">
                        <div class="product-image-wrap">
                            <img
                                src="${escapeHTML(product.image)}"
                                alt="${escapeHTML(product.name)}"
                                class="product-card-img"
                                loading="lazy"
                            >

                            <span class="product-badge"> ${escapeHTML(category)}</span></div>
                        <div class="card-body">
                            <div class="product-heading">
                                <h3> ${escapeHTML(product.name)}</h3>
                                <span class="product-type"> ${foodType}</span>
                            </div>
                            <p class="desc-text collapsed"> ${escapeHTML(product.desc)}</p>
                            <button type="button" class="read-more-btn" onclick="toggleDescription(this)"> Read more</button>
                            <div class="card-footer">
                                <div class="price"> ${formatCurrency(product.price)}</div>
                                <button type="button" class="btn" onclick="addItemById(${Number(product.id)})"> Add to Cart</button>
                            </div>
                        </div>
                    </article>
                `;
            })
            .join("");
}


/* =========================================
MENU SEARCH
========================================= */

function handleMenuSearch(value) {
    menuSearchQuery = String(value || "");
    renderProducts(activeCategory);
}

function clearMenuSearch() {
    const searchInput =
        document.querySelector("#menuSearch");

    if (searchInput) {
        searchInput.value = "";
    }

    menuSearchQuery = "";
    renderProducts(activeCategory);
}

window.handleMenuSearch = handleMenuSearch;
window.clearMenuSearch = clearMenuSearch;

/* =========================================
ADD PRODUCT USING PRODUCT ID
========================================= */

function addItemById(productId) {
    const product =
        products.find(
            item => item.id === Number(productId));
    if (!product) {
        showMessage("Burger not found.", "error");
        return;
    }

    addItem(product.name, product.price);
}

window.addItemById = addItemById;


/* =========================================
MENU FILTER
========================================= */

function filterMenu(category, button = null) {
    activeCategory = category || "all";
    renderProducts(activeCategory);
    document.querySelectorAll(".filter-btn")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    if (button) {
        button.classList.add("active");
    } else {
        const matchingButton =
            [
                ...document.querySelectorAll(".filter-btn")
            ].find( btn => btn.dataset.category === activeCategory);

        if (matchingButton) {
            matchingButton.classList.add("active");
        }
    }

    const menuSection = document.querySelector("#menu");

    if (menuSection) {
        menuSection.scrollIntoView({
            behavior: "smooth", block: "start"});
    }
}

window.filterMenu = filterMenu;


/* =========================================
DESCRIPTION TOGGLE
========================================= */

function toggleDescription(button) {
    if (!button) {
        return;
    }

    const description = button.previousElementSibling;

    if (!description) {
        return;
    }

    description.classList.toggle("collapsed");

    button.textContent =
        description.classList.contains("collapsed") ? "Read more" : "Read less";
}

window.toggleDescription = toggleDescription;


/* =========================================
RENDER BURGER CATEGORIES
========================================= */

function renderBurgerTypes() {
    if (!burgerCategoriesGrid) {
        return;
    }

    burgerCategoriesGrid.innerHTML =
        burgerTypes
            .map(type => {
                const itemsHTML =
                    type.items
                        .map(item => {
                            return `
                                <div class="type-item">
                                    <h4>${escapeHTML(item.title)}</h4>
                                    <p>${escapeHTML(item.desc)}</p>
                                </div>
                            `;
                        })
                        .join("");

                return `
                    <article class="card type-card">
                        <img
                            src="${escapeHTML(type.image)}"
                            alt="${escapeHTML(type.name)}"
                            class="type-card-img"
                            loading="lazy"
                        >
                        <div class="type-card-content">
                            <h3>${escapeHTML(type.name)}</h3>
                            <div class="type-items">${itemsHTML}</div>
                            <div class="type-card-footer">
                                <button type="button" class="btn category-btn" data-category="${escapeHTML(type.name)}"> Explore Burgers
                                <span aria-hidden="true">→</span></button>
                            </div>
                        </div>
                    </article>
                `;
            })
            .join("");

    const categoryButtons =burgerCategoriesGrid.querySelectorAll(".category-btn");

    categoryButtons.forEach(button => {
        button.addEventListener(
            "click",
            () => {
                const category =
                    button.dataset.category;

                if (category) {
                    filterMenu(category);
                }
            }
        );
    });
}


/* =========================================
INGREDIENTS
========================================= */

function renderIngredients() {
    if (!ingredientList) {
        return;
    }

    ingredientList.innerHTML =
        ingredients
            .map(item => {
                const quantity =
                    Math.max(
                        0,
                        Math.floor(
                            getSafeNumber(
                                selectedIngredients[
                                    item.id
                                ],
                                0
                            )
                        )
                    );

                const stock =getIngredientStock(item.id);
                const isOutOfStock = stock <= 0 || quantity >= stock;
                const encodedName = escapeHTML(item.name);
                return `
                    <div class="ingredient">
                        <div class="ingredient-info">
                            <strong>${encodedName}</strong>
                            <span class="ingredient-price">+${formatCurrency(item.price)}</span>
                            ${
                                stock <= 0
                                    ? `
                                        <span class="out-of-stock-tag">Out of Stock</span>
                                    `
                                    : ""
                            }
                        </div>
                        <div class="quantity-controls">
                            <button
                                type="button"
                                class="qty-btn"
                                onclick="changeIngredientQty('${item.id}', -1)"
                                ${
                                    quantity <= 0
                                        ? "disabled"
                                        : ""
                                }
                                aria-label="Decrease ${encodedName}"
                            >
                                −
                            </button>

                            <span
                                class="qty-count"
                                aria-live="polite"
                            >
                                ${quantity}
                            </span>

                            <button
                                type="button"
                                class="qty-btn"
                                onclick="changeIngredientQty('${item.id}', 1)"
                                ${
                                    isOutOfStock
                                        ? "disabled"
                                        : ""
                                }
                                aria-label="Increase ${encodedName}"
                            >
                                +
                            </button>

                        </div>

                    </div>
                `;
            })
            .join("");
}


/* =========================================
CHANGE INGREDIENT QUANTITY
========================================= */

function changeIngredientQty(id,change) {
    const item =
        ingredients.find(
            ingredient =>
                ingredient.id === id
        );

    if (!item) {
        return;
    }

    const currentQty =
        Math.max(
            0,
            Math.floor(
                getSafeNumber(
                    selectedIngredients[id],
                    0
                )
            )
        );

    const numericChange = Math.trunc(getSafeNumber(change,0));
    const newQty = currentQty + numericChange;
    if (newQty < 0) {
        return;
    }

    const stock = getIngredientStock(id);
    if (newQty > stock) {
        showMessage(`${item.name} is currently out of stock.`, "error");
        return;
    }

    if (newQty === 0) {
        delete selectedIngredients[id];
    } else {
        selectedIngredients[id] = newQty;
    }

    renderCustomizer();
}

window.changeIngredientQty = changeIngredientQty;


/* =========================================
CUSTOM BURGER DETAILS
========================================= */

function getCustomBurgerDetails() {
    let extraTotal = 0;

    const ingredientDetails = [];
    const summaryList = [];

    Object.entries(
        selectedIngredients
    ).forEach(([id, qty]) => {
        const item =
            ingredients.find(
                ingredient =>
                    ingredient.id === id
            );

        const quantity =
            Math.max(
                0,
                Math.floor(
                    getSafeNumber(
                        qty,
                        0
                    )
                )
            );

        if (
            item &&
            quantity > 0
        ) {
            const itemPrice =
                getSafeNumber(
                    item.price,
                    0
                );

            extraTotal += itemPrice * quantity;
            ingredientDetails.push({
                id: item.id,
                name: item.name,
                quantity,
                price: itemPrice
            });

            summaryList.push(`${item.name} x${quantity}`);
        }
    });

    return {
        basePrice: CUSTOM_BURGER_BASE_PRICE, extraTotal,
        total: CUSTOM_BURGER_BASE_PRICE + extraTotal,
        price: CUSTOM_BURGER_BASE_PRICE + extraTotal,
        ingredients: ingredientDetails,
        summary: summaryList
    };
}


/* =========================================
CUSTOM BURGER PREVIEW
========================================= */

function renderCustomizer() {
    const details = getCustomBurgerDetails();
    if (customPrice) {
        customPrice.textContent = Math.round(details.total);
    }

    if (customSummary) {
        customSummary.textContent =
            details.summary.length
                ? details.summary.join(", ")
                : "Start adding ingredients.";
    }

    if (customName) {
        customName.textContent = "Custom Brrrgrrr";
    }

    renderIngredients();
}


/* =========================================
CHECK CUSTOM BURGER STOCK
========================================= */

function checkCustomBurgerStock(
    ingredientDetails
) {
    for (const selected of ingredientDetails) {
        const available = getIngredientStock(selected.id);

        if (selected.quantity > available) {
            return {
                success: false,
                ingredient: selected
            };
        }
    }

    return {
        success: true
    };
}


/* =========================================
DEDUCT INGREDIENT STOCK
========================================= */

function deductIngredientStock(
    ingredientDetails
) {
    ingredientDetails.forEach(
        selected => {
            const currentStock =
                getIngredientStock(
                    selected.id
                );

            inventory[selected.id] =
                Math.max(
                    0,
                    currentStock -
                    selected.quantity
                );
        }
    );

    saveInventory();
}


/* =========================================
RETURN INGREDIENT STOCK
========================================= */

function returnIngredientStock(
    ingredientDetails,
    multiplier = 1
) {
    if (!Array.isArray(ingredientDetails)) {
        return;
    }

    const safeMultiplier =
        Math.max(
            1,
            Math.floor(
                getSafeNumber(
                    multiplier,
                    1
                )
            )
        );

    ingredientDetails.forEach(
        selected => {
            if (!selected || !selected.id) {
                return;
            }

            const amount =
                Math.max(
                    0,
                    Math.floor(
                        getSafeNumber(
                            selected.quantity,
                            0
                        )
                    )
                ) *
                safeMultiplier;

            inventory[selected.id] = getIngredientStock(selected.id) + amount;
        }
    );

    ingredients.forEach(item => {
        const originalStock =
            Math.max(
                0,
                Math.floor(
                    getSafeNumber(
                        item.stock,
                        0
                    )
                )
            );

        inventory[item.id] =
            Math.min(
                getIngredientStock(
                    item.id
                ),
                originalStock
            );
    });

    saveInventory();
}


/* =========================================
ADD STANDARD BURGER TO CART
========================================= */

function addItem(name,price) {
    const numericPrice = Number(price);
    const safeName = String(name || "").trim();

    if ( !safeName || !Number.isFinite(numericPrice) || numericPrice < 0) {
        showMessage("Unable to add this burger.", "error");
        return;
    }

    const existingItem =
        cart.find(item =>
            item.name === safeName &&
            !item.isCustom &&
            !Array.isArray(item.ingredients));

    if (existingItem) {
        existingItem.quantity =
            getSafeQuantity(existingItem.quantity) + 1;
    } else {
        cart.push({
            id: generateCartId(),
            name: safeName,
            price: numericPrice,
            quantity: 1,
            isCustom: false
        });
    }

    saveCart();

    showMessage(`${safeName} added to your cart!`, "success");
}

window.addItem = addItem;


/* =========================================
ADD CUSTOM BURGER TO CART
========================================= */

function addCustomBurger() {
    const details = getCustomBurgerDetails();
    if (details.total <= details.basePrice) {
        showMessage("Please add at least one ingredient.", "error");
        return;
    }

    const stockCheck = checkCustomBurgerStock(details.ingredients);
    if (!stockCheck.success) {
        showMessage(`${stockCheck.ingredient.name} is out of stock.`, "error");
        renderIngredients();
        return;
    }

    deductIngredientStock(details.ingredients);
    const customBurger = {
        id: `custom-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,
        name: "Custom Brrrgrrr",
        price: details.total,
        quantity: 1,
        isCustom: true,
        ingredients:
            details.ingredients.map(
                item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })
            )
    };

    cart.push(customBurger);
    saveCart();
    renderIngredients();
    renderCustomizer();
    showMessage("Custom burger added to your cart!", "success");
}


/* =========================================
RESET CUSTOMIZER
========================================= */

function resetCustomizer() {
    selectedIngredients = {};
    renderCustomizer();
}


/* =========================================
GET CUSTOM CART INGREDIENTS
========================================= */

function getCartIngredientDetails(cartItem) {
    if (!cartItem || !Array.isArray(cartItem.ingredients)) {
        return [];
    }

    return cartItem.ingredients
        .filter(
            ingredient =>
                ingredient &&
                typeof ingredient === "object" &&
                ingredient.id
        )
        .map(ingredient => ({
            id: String(ingredient.id),
            name: String(ingredient.name || ""),
            quantity: getSafeQuantity(ingredient.quantity, 1),
            price: Math.max(0,getSafeNumber(ingredient.price,0))
        }));
}


/* =========================================
CART QUANTITY
========================================= */

function updateQuantity(index,change) {
    const numericIndex = Number(index);
    if (!Number.isInteger(numericIndex) || !cart[numericIndex]) {
        return;
    }

    const item = cart[numericIndex];
    const currentQuantity = getSafeQuantity( item.quantity);
    const numericChange = Math.trunc(getSafeNumber(change,0));
    const newQuantity = currentQuantity + numericChange;
    if (item.isCustom) {
        const ingredientDetails = getCartIngredientDetails(item);
        if (numericChange > 0) {
            const stockCheck = checkCustomBurgerStock(ingredientDetails);
            if (!stockCheck.success) {
                showMessage(`${stockCheck.ingredient.name} is out of stock.`, "error");
                return;
            }

            deductIngredientStock(ingredientDetails);
            item.quantity = newQuantity;
            saveCart();
            renderIngredients();
            return;
        }

        if (numericChange < 0 && newQuantity > 0) {
            returnIngredientStock(ingredientDetails, 1);
            item.quantity = newQuantity;
            saveCart();
            renderIngredients();
            return;
        }

        if (newQuantity <= 0) {
            returnIngredientStock(ingredientDetails, currentQuantity);
            cart.splice(numericIndex,1);
            saveCart();
            renderIngredients();
            showMessage("Custom burger removed from cart.","success");
            return;
        }
    }

    if (newQuantity <= 0) {
        cart.splice(numericIndex,1);
    } else {
        cart[numericIndex].quantity = newQuantity;
    }
    saveCart();
}

window.updateQuantity = updateQuantity;


/* =========================================
REMOVE CART ITEM
========================================= */

function removeItem(index) {
    const numericIndex = Number(index);

    if (!Number.isInteger(numericIndex) || !cart[numericIndex]) {
        return;
    }

    const item = cart[numericIndex];
    const removedName = item.name;
    if (item.isCustom) {
        const ingredientDetails = getCartIngredientDetails(item);
        returnIngredientStock(ingredientDetails, getSafeQuantity(item.quantity));
    }

    cart.splice(numericIndex,1);
    saveCart();
    renderIngredients();
    showMessage(`${removedName} removed from cart.`,"success");
}

window.removeItem = removeItem;

/* =========================================
SAVE CART
========================================= */

function saveCart() {
    try {
        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart));
    } catch (error) {
        console.warn("Unable to save cart:", error);
    }

    renderCart();
}


/* =========================================
GET CART SUBTOTAL
========================================= */

function getCartSubtotal() {
    return cart.reduce(
        (sum, item) => {
            const price =
                Math.max(
                    0,
                    getSafeNumber(
                        item.price,
                        0
                    )
                );

            const quantity = getSafeQuantity(item.quantity);
            return (sum + price * quantity);
        },
        0
    );
}


/* =========================================
GET DELIVERY FEE
========================================= */

function getDeliveryFee() {
    const subtotal = getCartSubtotal();
    if (subtotal <= 0 || subtotal >= FREE_DELIVERY_THRESHOLD ) {
        return 0;
    }

    return DELIVERY_FEE;
}


/* =========================================
GET TAX
========================================= */

function getTaxAmount() {
    const subtotal = getCartSubtotal();
    return Math.round(subtotal * TAX_RATE);
}


/* =========================================
GET CART GRAND TOTAL
========================================= */

function getCartTotal() {
    return (getCartSubtotal() + getDeliveryFee() + getTaxAmount());
}


/* =========================================
GET CART ITEM COUNT
========================================= */

function getCartItemCount() {
    return cart.reduce(
        (sum, item) => {
            return (sum + getSafeQuantity(item.quantity));
        },
        0
    );
}


/* =========================================
UPDATE CART SUMMARY
========================================= */

function updateCartSummary() {
    const subtotal = getCartSubtotal();
    const delivery = getDeliveryFee();
    const tax = getTaxAmount();
    const total = subtotal + delivery + tax;
    const subtotalElement = document.querySelector("#cartSubtotal");
    const deliveryElement = document.querySelector("#deliveryFee");
    const taxElement = document.querySelector("#taxAmount");
    const totalElement = document.querySelector("#cartTotal");
    const paymentTotal = document.querySelector("#paymentTotal");
    if (subtotalElement) {
        subtotalElement.textContent = Math.round(subtotal);
    }

    if (deliveryElement) {
        deliveryElement.textContent =
            delivery === 0
                ? "Free"
                : formatCurrency(delivery);
    }

    if (taxElement) {
        taxElement.textContent = Math.round(tax);
    }

    if (totalElement) {
        totalElement.textContent = Math.round(total);
    }

    if (paymentTotal) {
        paymentTotal.textContent = Math.round(total);
    }
}


/* =========================================
RENDER CART
========================================= */

function renderCart() {
    const totalItems = getCartItemCount();
    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    updateCartSummary();
    if (!cartItems) {
        return;
    }

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="card empty-state">
                <div class="empty-state-icon"> 🛒</div>
                <h3> Your cart is empty</h3>
                <p> Add a delicious burger to get started.</p>
                <button type="button" class="btn" onclick="navigateTo('menu')"> Browse Menu</button>
            </div>
        `;
        return;
    }

    cartItems.innerHTML =
        cart
            .map(
                (item, index) => {
                    const quantity = getSafeQuantity(item.quantity);
                    const itemPrice =
                        Math.max(
                            0,
                            getSafeNumber(item.price,0));
                    const itemTotal = itemPrice * quantity;
                    let customText = "";
                    if (item.isCustom && Array.isArray(item.ingredients) && item.ingredients.length) {
                        const ingredientText =
                            item.ingredients
                                .map(
                                    ingredient => {
                                        if (ingredient && typeof ingredient === "object") {
                                            return `${ingredient.name} x${ingredient.quantity}`;
                                        }

                                        return String(ingredient);
                                    }
                                )
                                .join(", ");
                        customText = `<small class="cart-item-custom">
                                Custom: ${escapeHTML(ingredientText)}</small>
                        `;
                    }

                    return `
                        <div class="cart-row">
                            <div class="cart-item-info">
                                <span class="cart-item-name">
                                    <span class="cart-item-icon" aria-hidden="true"> 🍔</span>
                                    <strong> ${escapeHTML(item.name)}</strong></span>
                                ${customText}
                                <span class="cart-item-price">${formatCurrency(itemTotal)}</span>
                            </div>
                            <div class="quantity-controls">
                                <button
                                    type="button"
                                    class="qty-btn"
                                    onclick="updateQuantity(${index}, -1)"
                                    aria-label="Decrease quantity of ${escapeHTML(item.name)}"
                                >
                                    −
                                </button>
                                <span class="qty-count" aria-live="polite">${quantity}</span>
                                <button
                                    type="button"
                                    class="qty-btn"
                                    onclick="updateQuantity(${index}, 1)"
                                    aria-label="Increase quantity of ${escapeHTML(item.name)}"
                                >
                                    +
                                </button>
                                <button
                                    type="button"
                                    class="btn secondary remove-btn"
                                    onclick="removeItem(${index})"
                                    title="Remove item"
                                    aria-label="Remove ${escapeHTML(item.name)}"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    `;
                }
            )
            .join("");
}


/* =========================================
CLEAR CART
========================================= */

function clearCart() {
    if (cart.length === 0) {
        showMessage("Your cart is already empty.", "error");
        return;
    }

    cart.forEach(item => {
        if (item.isCustom) {
            const ingredientDetails = getCartIngredientDetails(item);
            returnIngredientStock(ingredientDetails, getSafeQuantity(item.quantity));
        }
    });


    cart = [];
    saveCart();
    renderIngredients();
    showMessage("Cart cleared successfully.", "success");
}

window.clearCart = clearCart;



/* =========================================
PAYMENT NAVIGATION
========================================= */

function proceedToPayment() {
    const total = getCartTotal();

    if (total <= 0) {
        showMessage("Your cart is empty! Add items before proceeding.", "error");
        return;
    }

    const paymentTotal = document.querySelector("#paymentTotal");
    if (paymentTotal) {
        paymentTotal.textContent = Math.round(total);
    }

    navigateTo("payment");
}

window.proceedToPayment = proceedToPayment;


/* =========================================
PAYMENT METHOD HANDLING
========================================= */

function initializePaymentMethods() {
    const paymentInputs = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetails = document.querySelector("#cardDetails");
    const upiDetails = document.querySelector("#upiDetails");
    const updatePaymentFields =
        () => {
            const selected = document.querySelector('input[name="paymentMethod"]:checked');
            const method = selected ? selected.value : "cod";
            if (cardDetails) {
                cardDetails.hidden = method !== "card";
            }

            if (upiDetails) {
                upiDetails.hidden = method !== "upi";
            }

            const cardNumber = document.querySelector("#cardNumber");
            const cardExpiry = document.querySelector("#cardExpiry");
            const cardCvv = document.querySelector("#cardCvv");
            const upiId = document.querySelector("#upiId");

            if (cardNumber) {
                cardNumber.required = method === "card";
            }
            if (cardExpiry) {
                cardExpiry.required = method === "card";
            }

            if (cardCvv) {
                cardCvv.required = method === "card";
            }

            if (upiId) {
                upiId.required = method === "upi";
            }
        };

    paymentInputs.forEach(
        input => {
            input.addEventListener("change", updatePaymentFields);
        }
    );

    updatePaymentFields();
}


/* =========================================
VALIDATE CHECKOUT
========================================= */

function validateCheckoutForm() {
    if (!checkoutForm) {
        return true;
    }

    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return false;
    }

    const phoneInput = document.querySelector("#checkoutPhone");
    if (phoneInput) {
        const phone = phoneInput.value.replace(/\D/g, "");
        if (phone.length !== 10) {
            showMessage("Please enter a valid 10-digit phone number.", "error");
            phoneInput.focus();
            return false;
        }
    }

    const pincodeInput = document.querySelector("#checkoutPincode");
    if (pincodeInput) {
        const pincode = pincodeInput.value.replace(/\D/g, "");
        if (pincode.length !== 6) {
            showMessage("Please enter a valid 6-digit pincode.", "error");
            pincodeInput.focus();
            return false;
        }
    }

    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedPayment) {
        showMessage("Please choose a payment method.", "error");
        return false;
    }
    return true;
}


/* =========================================
GENERATE ORDER NUMBER
========================================= */

function generateOrderNumber() {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(100 + Math.random() * 900);
    return `BRR-${timestamp}-${random}`;
}


/* =========================================
BUILD ORDER SUMMARY
========================================= */

function buildOrderSummary() {
    return cart
        .map(item => {
            const quantity = getSafeQuantity(item.quantity);
            const total = Math.round(getSafeNumber(item.price,0) * quantity);

            return `
                <div class="order-summary-row">
                    <span>
                        ${escapeHTML(
                            item.name
                        )}
                        ×${quantity}
                    </span>

                    <strong>${formatCurrency(total)}</strong>
                </div>
            `;
        })
        .join("");
}


/* =========================================
SHOW ORDER CONFIRMATION
========================================= */

function showOrderConfirmation(orderNumber, orderSummary) {
    const orderNumberElement = document.querySelector("#orderNumber");
    const orderSummaryElement = document.querySelector("#orderSummary");
    if (orderNumberElement) {
        orderNumberElement.textContent = orderNumber;
    }

    if (orderSummaryElement) {
        orderSummaryElement.innerHTML = orderSummary;
    }

    const confirmation = document.querySelector("#orderConfirmation");
    if (confirmation) {
        confirmation.hidden = false;
    }

    navigateTo("orderConfirmation");
}


/* =========================================
CHECKOUT
========================================= */

function checkout(event) {
    if ( event && typeof event.preventDefault === "function") {
        event.preventDefault();
    }

    if ( !cart.length) {
        showMessage("Your cart is empty.", "error");
        return;
    }

    if (!validateCheckoutForm()) {
        return;
    }

    const total = getCartTotal();
    const orderSummary = buildOrderSummary();
    const orderNumber = generateOrderNumber();


    showMessage(`Order ${orderNumber} placed successfully!`, "success");
    cart = [];
    saveCart();
    resetCustomizer();
    saveInventory();
    if (checkoutForm) {
        checkoutForm.reset();
    }

    initializePaymentMethods();
    showOrderConfirmation(orderNumber, orderSummary);
    console.info("Demo checkout completed:",
        {
            orderNumber, total,
            timestamp: new Date().toISOString()
        }
    );
}

window.checkout = checkout;

/* =========================================
CONTACT FORM
========================================= */

function initializeContactForm() {
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener(
        "submit",
        event => {
            event.preventDefault();

            const nameInput = document.querySelector("#contactName");
            const emailInput = document.querySelector("#contactEmail");
            const messageInput = document.querySelector("#contactMessage");
            const response = document.querySelector("#contactResponse");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";
            if (!name || !email || !message) {
                if (response) {
                    response.textContent = "Please fill out all required fields.";
                    response.className = "form-response error";
                }
                return;
            }

            if (emailInput && !emailInput.checkValidity()) {
                if (response) {
                    response.textContent = "Please enter a valid email address.";
                    response.className = "form-response error";
                }

                return;
            }

            if (response) {
                response.textContent = `Thank you, ${name}! Your message has been received.`;
                response.className = "form-response success";
            }

            showMessage(`Thank you, ${name}!`, "success");
            contactForm.reset();
        }
    );
}


/* =========================================
NAVIGATION OBSERVER
========================================= */

function initNavigationObserver() {
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-item");
    if (!sections.length || !navItems.length ||!("IntersectionObserver" in window)) {
        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(
                    entry => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        const sectionId = entry.target.id;
                        const activeId = sectionId ==="burgers" ? "menu" : sectionId;
                        navItems.forEach(
                            item => {
                                item.classList.remove("active");
                                if (item.getAttribute("href") === `#${activeId}`) {
                                    item.classList.add("active");
                                }
                            }
                        );
                    }
                );
            },
            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }
        );

    sections.forEach(
        section => {
            observer.observe(section);
        }
    );
}


/* =========================================
   HASH NAVIGATION
========================================= */

function handleHashNavigation() {
    let hash = window.location.hash.replace(/^#/, "");
    if (hash === "burgers") {
        hash = "menu";
    }

    if (!hash) {
        return;
    }

    const target = document.getElementById(hash);

    if (!target) {
        return;
    }

    setTimeout(
        () => {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            document.querySelectorAll(".nav-item")
                .forEach(
                    item => {
                        item.classList.remove("active");
                        if (
                            item.getAttribute("href") === `#${hash}`) {
                            item.classList.add("active");
                        }
                    }
                );
        },
        150
    );
}


window.addEventListener("hashchange", handleHashNavigation);


/* =========================================
CART + INVENTORY STORAGE SYNC
========================================= */

window.addEventListener(
    "storage",
    event => {
        if (event.key === CART_KEY) {
            cart = loadCart();
            renderCart();
        }

        if (event.key === INVENTORY_KEY) {
            inventory = initializeInventory();
            renderIngredients();
            renderCustomizer();
        }
    }
);


/* =========================================
   TOAST NOTIFICATION
========================================= */

function showMessage(message, type = "success") {
    let toast = document.querySelector("#toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.className = `toast-notification ${type}`;
    toast.textContent = String(message);

    requestAnimationFrame(
        () => {
            toast.classList.add("visible");
        }
    );

    clearTimeout(toastTimeout);

    toastTimeout =
        setTimeout(
            () => {
                toast.classList.remove("visible");
            },
            2800
        );
}

window.showMessage = showMessage;


/* =========================================
INITIALIZE SEARCH
========================================= */

function initializeMenuSearch() {
    const searchInput = document.querySelector("#menuSearch");
    const clearButton = document.querySelector("#clearMenuSearch");
    if (searchInput) {
        searchInput.addEventListener(
            "input",
            event => {
                handleMenuSearch(event.target.value);
            }
        );

        searchInput.addEventListener(
            "keydown",
            event => {
                if (event.key === "Escape") {
                    clearMenuSearch();
                    searchInput.blur();
                }
            }
        );
    }

    if (clearButton) {
        clearButton.addEventListener("click",clearMenuSearch);
    }
}


/* =========================================
INITIALIZE CHECKOUT FORM
========================================= */

function initializeCheckoutForm() {
    if (!checkoutForm) {
        return;
    }

    checkoutForm.addEventListener("submit",checkout);
    const phoneInput = document.querySelector("#checkoutPhone");

    if (phoneInput) {
        phoneInput.addEventListener(
            "input",
            () => {
                phoneInput.value =
                    phoneInput.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            10
                        );
            }
        );
    }

    const pincodeInput = document.querySelector("#checkoutPincode");

    if (pincodeInput) {
        pincodeInput.addEventListener(
            "input",
            () => {
                pincodeInput.value =
                    pincodeInput.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            6
                        );
            }
        );
    }

    const cardNumberInput = document.querySelector("#cardNumber");

    if (cardNumberInput) {
        cardNumberInput.addEventListener(
            "input",
            () => {
                const digits =
                    cardNumberInput.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            16
                        );

                cardNumberInput.value =
                    digits.replace(
                        /(.{4})/g,
                        "$1 "
                    ).trim();
            }
        );
    }

    const cardCvvInput = document.querySelector("#cardCvv");

    if (cardCvvInput) {
        cardCvvInput.addEventListener(
            "input",
            () => {
                cardCvvInput.value =
                    cardCvvInput.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            4
                        );
            }
        );
    }
}


/* =========================================
INITIALIZE EVENT LISTENERS
========================================= */

function initializeEventListeners() {
    if (clearCartButton) {
        clearCartButton.addEventListener("click", clearCart);
    }

    if (addCustomButton) {
        addCustomButton.addEventListener("click", addCustomBurger);
    }

    initializeContactForm();
    initializeNavigationLinks();
    initializeMenuSearch();
    initializeCheckoutForm();
    initializePaymentMethods();
}


/* =========================================
INITIALIZE FILTER BUTTONS
========================================= */

function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(
        button => {
            const category = button.dataset.category;

            if (!category) {
                return;
            }

            button.addEventListener(
                "click",
                () => {
                    filterMenu(
                        category,
                        button
                    );
                }
            );
        }
    );
}


/* =========================================
INITIALIZE ORDER CONFIRMATION
========================================= */

function initializeOrderConfirmation() {
    const confirmation = document.querySelector("#orderConfirmation");

    if (confirmation && !confirmation.hasAttribute("hidden")) {
        confirmation.hidden = true;
    }

    const continueButton = document.querySelector("#continueShoppingBtn");

    if (continueButton) {
        continueButton.addEventListener(
            "click",
            () => {
                navigateTo("menu");
            }
        );
    }
}


/* =========================================
INITIALIZE APPLICATION
========================================= */

function initializeApplication() {
    initializeApplicationState();
    initializeDOMReferences();
    initializeFilterButtons();
    renderProducts("all");
    renderBurgerTypes();
    renderCustomizer();
    renderCart();
    initializeEventListeners();
    initializeOrderConfirmation();
    initNavigationObserver();
    handleHashNavigation();
}


/* =========================================
START APPLICATION
========================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApplication,
        {
            once: true
        }
    );
} else {
    initializeApplication();
}