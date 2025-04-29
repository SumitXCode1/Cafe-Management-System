let orderList = [];
let subtotal = 0;
let ordersHistory = [];

function goToMenuPage() {
    document.querySelector('.welcome-page').style.display = 'none';
    document.getElementById('orderPage').style.display = 'flex';
}

function addItem(name, price) {
    orderList.push({ name, price });
    subtotal += price;
    updateOrderSummary();
}

function updateOrderSummary() {
    let orderListHtml = '';
    orderList.forEach(item => {
        orderListHtml += `<p>${item.name} - ₹${item.price}</p>`;
    });

    document.getElementById('orderList').innerHTML = orderListHtml;

    let tax = (subtotal * 0.05).toFixed(2);
    let gst = (subtotal * 0.05).toFixed(2);
    let total = (subtotal + parseFloat(tax) + parseFloat(gst)).toFixed(2);

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax;
    document.getElementById('gst').textContent = gst;
    document.getElementById('total').textContent = total;
}

function addNewItem() {
    const name = prompt("Enter the name of the new menu item:");
    const price = prompt("Enter the price of the new menu item:");

    if (name && price) {
        const menuContainer = document.getElementById('menu-items');
        const newItem = document.createElement('div');
        newItem.className = 'menu-item';
        newItem.innerHTML = `<span>${name} - ₹${price}</span><button class="add-btn" onclick="addItem('${name}', ${price})">Add</button>`;
        menuContainer.appendChild(newItem);
    }
}

function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked');

    if (paymentMethod) {
        if (paymentMethod.value === 'offline') {
            alert('Offline Payment Selected');
        } else if (paymentMethod.value === 'online') {
            document.getElementById('qrCode').style.display = 'block';
        }
    } else {
        alert('Please select a payment method');
    }
}

function viewOrders() {
    let ordersHtml = '';
    ordersHistory.forEach((order, index) => {
        ordersHtml += `
            <p>Order ${index + 1} (ID: ${order.id})</p>
            <p>Date: ${order.date} Time: ${order.time}</p>
            <ul>
                ${order.items.map(item => `<li>${item.name} - ₹${item.price}</li>`).join('')}
            </ul>
            <hr>
        `;
    });
    alert(ordersHtml);
}

function saveOrder() {
    const currentDate = new Date();
    const orderID = `ORD${Date.now()}`;
    ordersHistory.push({
        id: orderID,
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString(),
        items: [...orderList]
    });
    orderList = []; // Clear current order
    subtotal = 0; // Reset subtotal
    updateOrderSummary(); // Update summary after saving order
}
