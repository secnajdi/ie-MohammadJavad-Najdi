const drinks = [
    {
        name: "چای ساده",
        price: 25000
    },
    {
        name: "چای ماسالا",
        price: 60000
    },
    {
        name: "چای سبز",
        price: 40000
    },
    {
        name: "اسپرسو",
        price: 30000
    },
    {
        name: "لانگ بلک",
        price: 70000
    },
    {
        name: "لاته",
        price: 50000
    },
    {
        name: "آمریکانو",
        price: 40000
    },
    {
        name: "کاپوچینو",
        price: 60000
    },
];

let orders = null;
let orderId = 0;
let total = 0;

const orderTable = document.getElementById("order-table");

document.addEventListener('DOMContentLoaded', () => {
    orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];

    if (orders.length > 0) {
        orders.forEach((order) => {
            renderOrder(order);
        })

        updateTotalPrice();
    } else {
        renderEmpty();
    }
});

function renderOrder(order) {
    const element = `
        <tr id="order-${order.id}">
            <th scope="row" class="text-center opacity-50">${orders.length}</th>
            <td class="text-center opacity-50">${order.name}</td>
            <td class="text-center opacity-50">${order.count}</td>
            <td class="text-center opacity-50">${order.price}</td>
            <td class="text-center opacity-50">${order.total}</td>
            <td><button id="btn-remove-order-${order.id}" class="btn btn-sm">❌</button></td>
        </tr>
    `;
    orderTable.insertAdjacentHTML("beforebegin", element);

    const removeButton = document.getElementById(`btn-remove-order-${order.id}`);
    removeButton.addEventListener("click", function () {
        const idx = orders.findIndex((o) => o.id === order.id);
        orders = orders.filter((_, i) => i !== idx);

        if (orders.length > 0) {
            localStorage.setItem("orders", JSON.stringify(orders));
        } else {
            localStorage.removeItem("orders");
        }
        
        const orderElement = document.getElementById(`order-${order.id}`);
        orderElement.remove();

        if (orders.length === 0) {
            renderEmpty();
        }

        updateTotalPrice();
    });
}

function renderEmpty() {
    orderTable.insertAdjacentHTML("beforebegin", `<tr id="empty-notice"><td class="opacity-50">سفارشی ثبت نشده است</td></tr>`);
}

let buttonAdd = document.getElementById("btn_add_order");
buttonAdd.addEventListener('click', addOrder);

function addOrder() {
    const nameField = document.getElementById("order_name").value;
    const countField = parseInt(document.getElementById("order_count").value);

    if (!nameField || !countField) {
        alert("لطفا تمامی فیلدها را پر کنید!")
    } else {
        const order = {}; 
        order.id = orderId;
        order.name = nameField;
        const index = drinks.findIndex((drink) => drink.name === order.name);
        order.count = countField;
        order.price = drinks[index].price;
        order.total = order.count * order.price;
    
        orders = [...orders, order];
        localStorage.setItem("orders", JSON.stringify(orders));
    
        if (orders.length === 1) {
            const emptyNotice = document.getElementById("empty-notice");
            emptyNotice.remove();
        }
    
        renderOrder(order);
            updateTotalPrice();
    
        orderId++;
    }
    
}

function updateTotalPrice() {
    total = 0;
    
    if (orders.length > 0) {
        orders.forEach((o) => total += o.total);
    }

    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.textContent = total;
}