// ==================================
// YOUR SHOPPING - MARKETPLACE
// ==================================

// PRODUCT DATABASE (DEMO)

let products = [

    {
        id: 1,
        name: "Wireless Headphones",
        price: 1299,
        category: "Electronics",
        seller: "Tech Store",
        emoji: "🎧"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        category: "Electronics",
        seller: "Digital Shop",
        emoji: "⌚"
    },

    {
        id: 3,
        name: "Running Shoes",
        price: 1499,
        category: "Fashion",
        seller: "Fashion Hub",
        emoji: "👟"
    },

    {
        id: 4,
        name: "Backpack",
        price: 899,
        category: "Fashion",
        seller: "Bag House",
        emoji: "🎒"
    },

    {
        id: 5,
        name: "Table Lamp",
        price: 599,
        category: "Home",
        seller: "Home Store",
        emoji: "💡"
    },

    {
        id: 6,
        name: "Skincare Kit",
        price: 799,
        category: "Beauty",
        seller: "Glow Shop",
        emoji: "🧴"
    }

];


// SHOPPING CART

let cart = [];


// DISPLAY PRODUCTS

function displayProducts(list = products) {

    let container =
        document.getElementById("productList");

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML =
            "<p>No products found.</p>";
        return;
    }

    list.forEach(product => {

        container.innerHTML += `

            <div class="product">

                <div class="emoji">
                    ${escapeHTML(product.emoji)}
                </div>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p>
                    Seller:
                    ${escapeHTML(product.seller)}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <p>
                    ${escapeHTML(product.category)}
                </p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        `;

    });

}


// PROTECT USER-ENTERED TEXT

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

}


// ADD TO CART

function addToCart(id) {

    let product =
        products.find(p => p.id === id);

    if (product) {

        cart.push(product);

        updateCart();

        alert("Product added to cart!");

    }

}


// UPDATE CART

function updateCart() {

    let cartItems =
        document.getElementById("cartItems");

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `

            <div class="cart-item">

                ${escapeHTML(item.name)}

                - ₹${item.price}

                <button
                    class="remove"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    if (cart.length === 0) {

        cartItems.innerHTML =
            "Your cart is empty.";

    }


    document.getElementById("total").innerText =
        total;

    document.getElementById("cartCount").innerText =
        cart.length;

}


// REMOVE PRODUCT FROM CART

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// SEARCH PRODUCTS

document.getElementById("search")
.addEventListener("input", function() {

    let searchText =
        this.value.toLowerCase();

    let filtered = products.filter(product => {

        return (

            product.name.toLowerCase()
                .includes(searchText)

            ||

            product.category.toLowerCase()
                .includes(searchText)

            ||

            product.seller.toLowerCase()
                .includes(searchText)

        );

    });

    displayProducts(filtered);

});


// FILTER CATEGORY

function filterCategory(category) {

    if (category === "All") {

        displayProducts();

    } else {

        let filtered = products.filter(product => {

            return product.category === category;

        });

        displayProducts(filtered);

    }

}


// SELLER ADD PRODUCT

function addProduct() {

    let name =
        document.getElementById("productName")
        .value.trim();

    let seller =
        document.getElementById("sellerName")
        .value.trim();

    let price =
        Number(document.getElementById("productPrice").value);

    let category =
        document.getElementById("productCategory").value;


    if (!name || !seller ||
        !Number.isFinite(price) || price <= 0) {

        alert("Please enter valid product details!");

        return;

    }


    let newProduct = {

        id: Date.now(),

        name: name,

        seller: seller,

        price: price,

        category: category,

        emoji: "🛍️"

    };


    products.push(newProduct);

    displayProducts();


    document.getElementById("productName").value = "";

    document.getElementById("sellerName").value = "";

    document.getElementById("productPrice").value = "";


    alert("Product added successfully!");

}


// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    let total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );


    alert(

        "Your order total is ₹" + total +

        "\nThank you for shopping with us!"

    );

}


// SHOW CART

function showCart() {

    document.getElementById("cartSection")
    .scrollIntoView({

        behavior: "smooth"

    });

}


// SHOP NOW

function scrollToProducts() {

    document.querySelector(".shop")
    .scrollIntoView({

        behavior: "smooth"

    });

}


// START WEBSITE

displayProducts();

updateCart();
