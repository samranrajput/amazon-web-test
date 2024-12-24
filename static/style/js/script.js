$(document).ready(function () {
    // Initialize global popover variable
    let popover;

    const popcart = document.getElementById('popcart');
    if (popcart) {
        popover = bootstrap.Popover.getInstance(popcart);
        if (!popover) {
            popover = new bootstrap.Popover(popcart, {
                html: true
            });
        }
    }

    if (localStorage.getItem('cart') == null) {
        var cart = {};
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
        document.getElementById('cart').innerHTML = Object.keys(cart).length;
        updateCart(cart);
    }

    // jQuery starts here
    $('.divpr').on('click', 'button.cart', function () {
        var idstr = this.id.toString();

        if (cart[idstr] != undefined) {
            cart[idstr] = cart[idstr] + 1;
        } else {
            cart[idstr] = 1;
        }
        updateCart(cart);
    });

    function updateCart(cart) {
        var sum = 0;
        for (var item in cart) {
            sum = sum + cart[item];
            document.getElementById('div' + item).innerHTML = "<a class='btn btn-success'>Go To Cart</a>";
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart').innerHTML = sum;
        updatePopover(cart);
    }

    function clearCart() {
        cart = JSON.parse(localStorage.getItem('cart'));
        for (var item in cart) {
            document.getElementById('div' + item).innerHTML = '<button id="' + item + '" class="btn btn-primary cart">Add To Cart</button>'
        }
        localStorage.clear();
        cart = {};
        updateCart(cart);
    }

    function updatePopover(cart) {
        let totalSum = 0;
        const checkOutUrl = document.getElementById('popcart').getAttribute('data-checkout-url');

        // Start building the popover content
        let popStr = `
            <a href="${checkOutUrl}" id="check_out" class="btn btn-warning form-control btn-sm">Check Out</a><hr>
            <a class="btn btn-success btn-sm">Go To Carts</a> 
            <a class="btn btn-danger btn-sm" id="clear_carts">Clear Carts</a>
            <div class="mx-2 my-2"><br>
        `;

        // Loop through cart items and calculate totalSum
        for (var item in cart) {
            const itemName = document.getElementById('name' + item)?.innerHTML.slice(0, 25) || 'Empty Carts';
            const itemPrice = document.getElementById('price' + item)?.innerHTML || 'N/A';
            const Price = parseFloat(itemPrice.slice(4));

            if (!isNaN(Price)) {
                totalSum += Price * cart[item]; // Add to total sum
            }

            const itemImgSrc = document.getElementById('img' + item)?.src || 'placeholder.jpg';
            popStr += `
                <img src="${itemImgSrc}" alt="${itemName}" width="160" height="150"><br>
                <div class="text-center">
                    <h6>${itemName} <span class="text-success">${itemPrice}</span></h6>
                </div>
                <a id="minus-${item}" class="btn btn-sm btn-danger">-</a>
                <span id="quantity-${item}">${cart[item]}</span>
                <a id="plus-${item}" class="btn btn-sm btn-success">+</a>
                <a id="delete-${item}" class="btn btn-sm btn-danger">Delete</a>
                <hr>
            `;
        }

        // Add totalSum dynamically after the loop
        popStr = `
            <h6 class="text-center">Subtotal</h6>
            <h5 class="text-success text-center">Rs. ${totalSum}</h5>
        ` + popStr;

        // Close the div
        popStr += "</div>";

        // Set popover content
        popover.setContent({
            '.popover-body': popStr
        });

        // Add clear cart button listener
        setTimeout(() => {
            for (var item in cart) {
                // Minus button functionality
                document.getElementById(`minus-${item}`)?.addEventListener('click', function (e) {
                    const itemId = e.target.id.split('-')[1]; // Get item ID from button ID
                    cart[itemId] = Math.max(0, cart[itemId] - 1); // Minimum quantity = 0
                    document.getElementById(`quantity-${itemId}`).innerText = cart[itemId];
                    updateCart(cart); // Update cart and UI
                });

                // Plus button functionality
                document.getElementById(`plus-${item}`)?.addEventListener('click', function (e) {
                    const itemId = e.target.id.split('-')[1]; // Get item ID from button ID
                    cart[itemId] += 1; // Increase quantity
                    document.getElementById(`quantity-${itemId}`).innerText = cart[itemId];
                    updateCart(cart); // Update cart and UI
                });

                // Delete button functionality
                document.getElementById(`delete-${item}`)?.addEventListener('click', function (e) {
                    const itemId = e.target.id.split('-')[1]; // Get item ID from button ID
                    delete cart[itemId]; // Remove item from the cart
                    document.getElementById('div' + itemId).innerHTML = '<button id="' + itemId + '" class="btn btn-primary cart">Add To Cart</button>';
                    updateCart(cart);  // Update cart UI and localStorage
                });
            }
            const clearCartsButton = document.getElementById('clear_carts');
            if (clearCartsButton) {
                clearCartsButton.addEventListener('click', clearCart);
            }
        }, 100);

    }
    document.getElementById("popcart").addEventListener('click', function () {
        updatePopover(cart);
    });
});
