// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array

    const productIndex = products.findIndex((product) => product.id === id)
    const cartIndex = cart.findIndex((cartProduct) => cartProduct.id === id )
    if(cartIndex != -1){
        cart[cartIndex].quantity += 1
        cart[cartIndex].subtotal = cart[cartIndex].price * cart[cartIndex].quantity;
    } else{
        cart.push(products[productIndex]);
        cart[cart.length -1].quantity = 1;
        cart[cart.length -1].subtotal = cart[cart.length - 1].price;
    }
    //show in cart:
    showCart();
}
function showCart() {
    let count = document.getElementById("count_product");
    let countProduct = 0;
    cart.forEach((products) => countProduct += products.quantity);
    count.innerHTML = countProduct;
    console.log("Products in the cart:", cart);
}

// Exercise 2
function cleanCart() {
    cart = [];
    removeItems();
}
 //Remove the items form the cart:
function removeItems() {
    let cartList = document.getElementById("cart_list");
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
    // Clean the cart and set total at 0:
    let total = document.getElementById("total");
    total.innerHTML = 0;

    //update the cart:
    showCart();
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array:

    //To calculate the whole total let sapply the discounts :
    applyPromotionsCart();
    let totalPrice = 0;
    cart.forEach(product => {
        product.subtotal = (product.price * product.quantity);
        totalPrice += product.subtotalWithDiscount > 0 ? product.subtotalWithDiscount : product.subtotal;
    })
    return totalPrice;
}

// Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    //for the appliction of promtion carts we have 2 product which have offers like on cooking oil if we purchase will get 20% dicount and on instant cupcake mixtures will get 30% discount.

    cart.forEach((product) => {
        if (product.offer) {
            if (product.quantity >= product.offer.number) {
                product.subtotalWithDiscount = ((product.price - (product.price * product.offer.percent / 100)) * product.quantity);
            } else {
                product.subtotalWithDiscount = 0;
            }
        }
    })
    return cart;
}

// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
 
    //To print the cart with each item added we create a new row with the reference of table
    cart.forEach((product) => {
        let row = document.createElement("tr");
        let tbody = document.getElementById("cart_list");
        //now collecting the ata of the product like price numbere abd quantity
        row.innerHTML = `
        <th scope="row">${product.name}</th>        
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td><buttom class="btn btn-primary btn-3" onclick="removeFromCart(${product.id})">Remove</buttom></td>
        <td>${product.subtotalWithDiscount ? product.subtotalWithDiscount.toFixed(2) : product.subtotal.toFixed(2)}</td>`;

        tbody.appendChild(row);
    })
    let total = document.getElementById("total");
    total.innerHTML = calculateTotal().toFixed(2) == null ? 0 : calculateTotal().toFixed(2);

}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {

    //To remove the items from the cart firdt of all check the product exists in the cart with find array method then apply condition 

    let Item = cart.find(Item => Item.id == id);
    console.log(Item);
    if (Item.quantity > 1) {
        Item.quantity = Item.quantity - 1;
    } else {
        if (Item.quantity === 1) {
            cart = cart.filter(item => item.id !== id);
        }
    };
    //Remove all the items from the cart:
    removeItems();
    //calling open_modal:
    open_modal();
    //update the cart:
    showCart();
}

function open_modal() {
    calculateTotal();
    printCart();
}