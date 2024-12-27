$(document).ready(function () {
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
    let cart = {};
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (document.getElementById('cart')) {
            document.getElementById('cart').innerHTML = Object.keys(cart).length;
        }
        updateCart(cart);
    }

    if ($('.divpr').length > 0) {
        $('.divpr').on('click', 'button.cart', function () {
            var idstr = this.id.toString();
            if (cart[idstr] != undefined) {
                qty = cart[idstr][0] + 1;
            } else {
                qty = 1;
                pr_name = document.getElementById('name' + idstr)?.innerHTML || "Unknown Item";
                pr_img = document.getElementById('img' + idstr)?.src || 'placeholder.jpg';
                pr_dis_price = document.getElementById('disprice' + idstr)?.innerHTML || 'N/A';    
                dis_price = parseFloat(pr_dis_price.slice(4));     
                pr_price = document.getElementById('price' + idstr)?.innerHTML || 'N/A';
                price = parseFloat(pr_price.slice(4));            
                cart[idstr] = [qty, pr_name, dis_price, price, pr_img];
            }
            updateCart(cart);
        });
    }
    function updateCart(cart) {
        var sum = 0;
        for (var item in cart) {
            sum = sum + cart[item][0];
            if (document.getElementById('div' + item)) {
                document.getElementById('div' + item).innerHTML = "<a class='btn btn-success'>Go To Cart</a>";
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        if (document.getElementById('cart')) {
            document.getElementById('cart').innerHTML = sum;
        }
        updatePopover(cart);
    }
    function clearCart() {
        cart = JSON.parse(localStorage.getItem('cart')) || {};
        for (var item in cart) {
            if (document.getElementById('div' + item)) {
                document.getElementById('div' + item).innerHTML = '<button id="' + item + '" class="btn btn-primary cart">Add To Cart</button>';
            }
        }
        localStorage.clear();
        cart = {};
        updateCart(cart);
    }
    document.getElementById("popcart").addEventListener('click', function () {
        updatePopover(cart);
    });
    
    function updatePopover(cart) {
        if (!popover) return;
        let disTotalSum = 0;
        let totalSum = 0;
        let popStr = "";
        const checkOutUrl = document.getElementById('popcart').getAttribute('data-checkout-url');
        const currentPath = window.location.pathname;
        console.log(currentPath)
    
        if (Object.keys(cart).length === 0) {
            popStr = `<h6 class="text-center text-danger">Cart is Empty</h6>`;
        } else {
            if (currentPath === '/shop/check/out') { // Replace '/checkout/' with your actual checkout page path
                popStr = `
                    <a class="btn btn-primary form-control btn-sm" id="return_cart">Return to Cart</a><hr>
                `;
            } else {
                popStr = `
                    <a href="${checkOutUrl}" id="check_out" class="btn btn-warning form-control btn-sm">Check Out</a><hr>
                    <a class="btn btn-success btn-sm">Go To Carts</a> 
                    <a class="btn btn-danger btn-sm" id="clear_carts">Clear Carts</a>
                    <div class="mx-2 my-2">
                `;
                for (var item in cart) {
                    const itemName = cart[item][1] || "Unknown Item";
                    if (!isNaN(cart[item][2])) {
                        disTotalSum += cart[item][2] * cart[item][0];
                    }
                    if (!isNaN(cart[item][3])) {
                        totalSum += cart[item][3] * cart[item][0];
                    }
                    popStr += `
                        <img src="${cart[item][4]}" alt="${itemName}" width="160" height="150"><br>
                        <h6 class="text-center">${itemName}</h6>
                        <h6 class="text-success text-center">${cart[item][2]} - <span class="lt text-danger">${cart[item][3]}</span></h6>
                        <a id="minus-${item}" class="btn btn-sm btn-dark">-</a>
                        <span id="quantity-${item}">${cart[item][0]}</span>
                        <a id="plus-${item}" class="btn btn-sm btn-dark me-3">+</a>
                        <a id="delete-${item}" class="btn btn-sm btn-danger">Delete</a>
                        <hr>
                    `;
                }
                popStr = `
                    <h6 class="text-center">Subtotal</h6>
                    <h6 class="text-success text-center">Rs. ${disTotalSum} - <span class="lt text-danger">Rs. ${totalSum}</span></h6>
                ` + popStr;
                popStr += "</div>";
            }
        }
    
        // Set popover content
        popover.setContent({
            '.popover-body': popStr
        });
    
        // Add clear cart button listener and other dynamic functionality
        setTimeout(() => {
            if (Object.keys(cart).length > 0) {
                for (var item in cart) {
                    document.getElementById(`minus-${item}`)?.addEventListener('click', function (e) {
                        const itemId = e.target.id.split('-')[1];
                        cart[itemId][0] = Math.max(0, cart[itemId][0] - 1);
                        if (cart[itemId][0] === 0) {
                            delete cart[itemId];
                        }
                        updateCart(cart);
                    });
                    document.getElementById(`plus-${item}`)?.addEventListener('click', function (e) {
                        const itemId = e.target.id.split('-')[1];
                        cart[itemId][0] += 1;
                        updateCart(cart);
                    });
                    document.getElementById(`delete-${item}`)?.addEventListener('click', function (e) {
                        const itemId = e.target.id.split('-')[1];
                        delete cart[itemId];
                        updateCart(cart);
                    });
                }
            }
            document.getElementById('return_cart')?.addEventListener('click', function () {
                window.location.href = '/shop/';
            });
            document.getElementById('clear_carts')?.addEventListener('click', clearCart);
        }, 100);
    }
    
    document.getElementById("popcart").addEventListener('click', function () {
        updatePopover(cart);
    });
});     


if (localStorage.getItem('cart') == null) {
    var cart = {};
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}
console.log(cart);
var sum = 0;
if ($.isEmptyObject(cart)) {
    // If object is empty
    mystr = "<p>Your cart is empty, please add some items before checking out ! </p>"
    $('#items').append(mystr);
}

let disTotalSum = 0;
let totalSum = 0;
for (item in cart) {
    let qty = cart[item][0];
    let name = cart[item][1];
    let dis_price = cart[item][2];
    let price = cart[item][3];
    let img = cart[item][4];
    sum = sum + qty;
    if (!isNaN(dis_price)) {
        disTotalSum += dis_price * qty;
    }
    if (!isNaN(price)) {
        totalSum += price * qty;
    }
    mystr = `
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">${name}
                    <img src="${img}" alt="${name}" width="160" height="150"><br>
                    <p class="text-success">Rs. ${dis_price} - <del class="text-danger">Rs. ${price}</del></p>
                    <span class="badge bg-primary badge-pill">${qty}</span>
                </li>    
             </ul>
            `
    $('#items').append(mystr);
}
mystr = `
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <p class="">${disTotalSum} - ${totalSum}</p>
            </li>    
            </ul>
        `
    $('#items').append(mystr);
document.getElementById('cart').innerHTML = sum;

$('#trackerForm').submit(function(event) {
    $('#track').empty();
    var formData = {
        'orderId': $('input[name=orderId]').val(),
        'email': $('input[name=email]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    };
    $.ajax({
        type: 'POST',
        url: '/shop/tracker',
        data: formData,
        encode: true
    })
    .done(function(data) {
        console.log(data)
        data = JSON.parse(data);
        updates = data[0];
        if (updates.length > 0 & updates != {}) {
            for (i = 0; i < updates.length; i++) {
                let text = updates[i]['text'];
                let time = updates[i]['time'];
                str = `<li class="list-group-item d-flex justify-content-between align-items-center">
                ${text}
                <span class="badge bg-primary badge-pill">${time}</span>
            </li>`
            $('#track').append(str);
            }
        } else {
            str = `<li class="list-group-item d-flex justify-content-between align-items-center">
                Sorry, We are not able to fetch this order id and email. Make sure to type correct order Id and email</li>`
            $('#track').append(str);
        }
        cart = JSON.parse(data[1]);
        console.log(cart);
        for (item in cart) {
            let name = cart[item][1];
            let qty = cart[item][0];
            str = `<li class="list-group-item d-flex justify-content-between align-items-center">
                ${name}
                <span class="badge bg-primary badge-pill">${qty}</span>
            </li>`
            $('#citems').append(str);
        }
    });
    event.preventDefault();
});