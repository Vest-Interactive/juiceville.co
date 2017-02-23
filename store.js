'use strict';

var order = {};
var cleanedOrder = {};
var flavorContainers = document.querySelectorAll('#flavors > div');

var cart = document.querySelector('#lineitems');

var getCleanOrder = function getCleanOrder() {
    var cleanedOrder = {};
    for (var item in order) {
        var itemQuantity = order[item];
        var splitItem = item.split('-');
        var brand = splitItem[0];
        if (!cleanedOrder[splitItem[0]]) {
            cleanedOrder[splitItem[0]] = {};
        }
        switch (brand) {
            case 'nutrabio':
                var flavorSplit = [];
                var flavorJoined = '';
                if (splitItem[1] === 'prex') {
                    flavorSplit = splitItem.slice(2);
                    flavorJoined = flavorSplit.join('-');
                    if (!cleanedOrder[brand].prex) {
                        cleanedOrder[brand].prex = {
                            totalItems: 0
                        };
                    }
                    cleanedOrder[brand].prex[flavorJoined] = itemQuantity;
                    cleanedOrder[brand].prex.totalItems += itemQuantity;
                    break;
                }
                if (splitItem[1] === 'intra') {
                    flavorSplit = splitItem.slice(2);
                    flavorJoined = flavorSplit.join('-');
                    if (!cleanedOrder[brand].intra) {
                        cleanedOrder[brand].intra = {
                            totalItems: 0
                        };
                    }
                    cleanedOrder[brand].intra[flavorJoined] = itemQuantity;
                    cleanedOrder[brand].intra.totalItems += itemQuantity;
                    break;
                }
                if (splitItem[1] === 'whey') {
                    flavorSplit = splitItem.slice(3);
                    flavorJoined = flavorSplit.join('-');
                    if (!cleanedOrder[brand].whey) {
                        cleanedOrder[brand].whey = {}
                    }
                    if (!cleanedOrder[brand].whey[splitItem[2]]) {
                        cleanedOrder[brand].whey[splitItem[2]] = {
                            totalItems: 0
                        };
                    }
                    cleanedOrder[brand].whey[splitItem[2]][flavorJoined] = itemQuantity;
                    cleanedOrder[brand].whey[splitItem[2]].totalItems += itemQuantity;
                }
                break;
            case 'c4':
                var flavorSplit = [];
                var flavorJoined = '';
                if (splitItem[1] === 'powder') {
                    flavorSplit = splitItem.slice(2);
                    flavorJoined = flavorSplit.join('-');
                    if (!cleanedOrder[brand].powder) {
                        cleanedOrder[brand].powder = {
                            totalItems: 0
                        };
                    }
                    cleanedOrder[brand].powder[flavorJoined] = itemQuantity;
                    cleanedOrder[brand].powder.totalItems += itemQuantity;
                    break;
                } else if (splitItem[1] === 'rtd') {
                    if (!cleanedOrder[brand].rtd) {
                        cleanedOrder[brand].rtd = {};
                    }

                    if (splitItem[2] == 'case') {
                        flavorJoined = splitItem.slice(3);
                        if (!cleanedOrder[brand].rtd.case) {
                            cleanedOrder[brand].rtd.case = {
                                totalItems: 0
                            };
                            cleanedOrder[brand].rtd.case[flavorJoined] = itemQuantity;
                        }

                        cleanedOrder[brand].rtd.case.totalItems += itemQuantity;

                        if (!cleanedOrder[brand].rtd.case[flavorJoined]) {
                            cleanedOrder[brand].rtd.case[flavorJoined] = {};
                            cleanedOrder[brand].rtd.case[flavorJoined] = itemQuantity;
                        } else {
                            cleanedOrder[brand].rtd.case[flavorJoined] += itemQuantity;
                        }
                    } else {
                        if (!cleanedOrder[brand].rtd.single) {
                            cleanedOrder[brand].rtd.single = {
                                totalItems: 0
                            };
                        }

                        cleanedOrder[brand].rtd.single.totalItems += itemQuantity;

                        flavorJoined = splitItem.slice(2);
                        if (cleanedOrder[brand].rtd.single[flavorJoined]) {
                            cleanedOrder[brand].rtd.single[flavorJoined] += itemQuantity;
                        } else {
                            cleanedOrder[brand].rtd.single[flavorJoined] = itemQuantity;
                        }
                    }
                }
                break;
            default:
                if (!cleanedOrder[brand].totalItems) {
                    cleanedOrder[brand].totalItems = 0;
                }
                cleanedOrder[brand].totalItems += itemQuantity;
                flavorJoined = splitItem.slice(1).join('-');
                if (!cleanedOrder[brand][flavorJoined]) {
                    cleanedOrder[brand][flavorJoined] = itemQuantity;
                } else {
                    cleanedOrder[brand][splitItem.slice(1)] += itemQuantity;
                }
        }
    }

    var subtotal = 0;
    var mnmBrands = ['quest', 'ohyeahone', 'ansi'];
    var mnmTotal = 0;
    var totalOrderItems = 0;
    var discounts = {};
    var totalDiscounts = 0;
    var tax = {};

    for (var _brand in cleanedOrder) {
        if (mnmBrands.indexOf(_brand) >= 1) {
            mnmTotal += cleanedOrder[_brand].totalItems;
            totalOrderItems += cleanedOrder[_brand].totalItems;
        }
        switch (_brand) {
            case 'nutrabio':
                if (cleanedOrder[_brand].whey) {
                    if (cleanedOrder[_brand].whey.two) {
                        subtotal += cleanedOrder[_brand].whey.two.totalItems * 30;
                    }
                    if (cleanedOrder[_brand].whey.five) {
                        subtotal += cleanedOrder[_brand].whey.five.totalItems * 55;
                    }
                }
                if (cleanedOrder[_brand].prex) {
                    subtotal += cleanedOrder[_brand].prex.totalItems * 43;
                }
                if (cleanedOrder[_brand].intra) {
                    subtotal += cleanedOrder[_brand].intra.totalItems * 30;
                }
                break;
            case 'cellucor':
                totalOrderItems += cleanedOrder[_brand].totalItems;
                subtotal += cleanedOrder[_brand].totalItems * 2.75;
                break;
            case 'larrylenny':
                totalOrderItems += cleanedOrder[_brand].totalItems;
                subtotal += cleanedOrder[_brand].totalItems * 2.35;
                if (cleanedOrder[_brand].totalItems / 12 >= 1) {
                    discounts['larrylenny'] = parseInt(cleanedOrder[_brand].totalItems / 12) * 3.2
                }
                break;
            case 'c4':
                if (cleanedOrder[_brand].rtd) {
                    if (cleanedOrder[_brand].rtd.case) {
                        subtotal += cleanedOrder[_brand].rtd.case.totalItems * 37;
                    }
                    if (cleanedOrder[_brand].rtd.single) {
                        subtotal += cleanedOrder[_brand].rtd.single.totalItems * 3.5;
                    }
                }
                if (cleanedOrder[_brand].powder) {
                    subtotal += cleanedOrder[_brand].powder.totalItems * 32;
                }
                break;
            case 'quest':
            case 'ohyeahone':
            case 'ansi':
                mnmTotal += cleanedOrder[_brand].totalItems;
                totalOrderItems += cleanedOrder[_brand].totalItems;
                subtotal += cleanedOrder[_brand].totalItems * 2.5;
                break;
        }
        if (mnmTotal / 12 >= 1) {
            discounts['mix-n-match'] = parseInt(mnmTotal / 12) * 2
        }
    }

    cleanedOrder.subtotal = subtotal;
    cleanedOrder.discounts = discounts;
    cleanedOrder.subtotal = subtotal.toFixed(2);
    for (var discount in discounts) {
        totalDiscounts += discounts[discount]
    }
    cleanedOrder.totalDiscounts = totalDiscounts.toFixed(2);
    cleanedOrder.taxes = ((subtotal - totalDiscounts) * 0.06).toFixed(2);
    cleanedOrder.total = ((subtotal - totalDiscounts) * 1.06).toFixed(2);
    return cleanedOrder;
};
getCleanOrder();

var getCartText = function getCartText() {
    var useJson = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var withPre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var orderText = "";
    if (useJson) {
        orderText = JSON.stringify(getCleanOrder(), null, 2);
    }
    if (withPre) {
        orderText = '<pre>' + orderText + '</pre>';
    }
	orderText = orderText.replace('{', ' ').replace('}', ' ');
    return '' + orderText;
};
var getOrderSheetValues = function getOrderSheetValues() {
    var currentOrder = document.querySelectorAll('#flavors > div.show input');
    currentOrder.forEach(function(elm) {
        var itemQuantity = parseInt(elm.value);
        elm.value = 0;
        if (itemQuantity > 0) {
            //console.log(elm.name, itemQuantity);
            if (!order[elm.name]) {
                order[elm.name] = itemQuantity;
            } else {
                order[elm.name] = order[elm.name] + itemQuantity;
            }
        }
    });
    cart.innerHTML = getCartText(true, true);
};

var addToCart = document.querySelector('#add-item');
addToCart.addEventListener('click', function(event) {
    event.preventDefault();
    getOrderSheetValues();
});

var mixNmatches = document.querySelectorAll('.mix-n-match');
var productChange = function productChange(event) {
    var targetValue = event.target.value;
    flavorContainers.forEach(function(elm) {
        if (elm.classList.contains('show')) {
            elm.classList.remove('show');
            elm.classList.add('hide');
        }
    });
    switch (targetValue) {
        case 'mix-n-match':
            mixNmatches.forEach(function(elm) {
                elm.classList.add('show');
                elm.classList.remove('hide');
            });
            break;
        default:
            document.querySelector('#' + targetValue).classList.add('show');
            document.querySelector('#' + targetValue).classList.remove('hide');
    }
};

var productSelect = document.getElementById('productslist');
productSelect.addEventListener('change', productChange);

//
// ORDER FORM
//
var submitOrder = function submitOrder(event) {
    var request = new XMLHttpRequest();
    request.open('POST', '/ajaxtest.php', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onload = function() {
        var resp = request.responseText;
        if (request.status >= 200 && request.status < 400) {
            // Success!
            //Show your popup here
            alert("Thank you! Your order has been sent.");
        } else {
            // We reached our target server, but it returned an error
            //Show errors here
        }
    };

    request.onerror = function() {
        console.log('err');
        // There was a connection error of some sort
    };

    request.send(JSON.stringify({
    'order': getCleanOrder(),
    'name': document.getElementById('pickupName').value,
    'email': document.getElementById('emailAddress').value
    }, null, 4));

};
var sendOrder = document.getElementById('complete-order');
sendOrder.addEventListener('click', submitOrder);
