const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];//Retrieve the cart from local storage
const orderTable = document.querySelector('.orderInfo');
const orderTotal = document.querySelector('.totalOrder');


orderItems.forEach(orderItem => {
    const subTot = orderItem.qty * orderItem.price;

    const tableRow = document.createElement('tr');//Creating a table row(not visible till appended)
    tableRow.setAttribute('data-code',orderItem.code);

    tableRow.innerHTML = `
    <td>${orderItem.name}</td>
    <td>${orderItem.price}</td>
    <td><input type="number" min="1" step="1" class="tableQty" value="${orderItem.qty}" data-code="${orderItem.code}"></td>
    <td class="tablesubTot">LKR ${subTot.toFixed(2)}</td>
    <td><button class="deleteItem" data-code="${orderItem.code}">Delete</button></td>
    `
    orderTable.appendChild(tableRow);
})

let total = 0;
[...orderTable.rows].forEach(row => {
    const subtotalCell = row.querySelector('.tablesubTot');
    if (subtotalCell){
        total += parseFloat(subtotalCell.textContent.replace('LKR ',''));
    }
});

orderTotal.textContent = `LKR ${total.toFixed(2)}`;


function updateTotal() {
    let total = 0;
    document.querySelectorAll('.tablesubTot').forEach(cell => {
        total += parseFloat(cell.textContent.replace('LKR ', ''));
    });
    document.querySelector('.totalOrder').textContent = `LKR ${total.toFixed(2)}`
}

//to update total, sutotal and quantity values when changes are made in the cart table
document.querySelectorAll('.tableQty').forEach(updateQty => { 
    updateQty.addEventListener('input', () => {
        const row =  updateQty.closest('tr');
        const code = updateQty.dataset.code;
        const newQty = parseInt(updateQty.value);
        if (isNaN(newQty) || newQty < 1) return;
        
        let orderItems = [];

        try {//Safe way to load Array due to unexpected error when using the "JSON.parse(localStorage.getItem('')) || []" method
            const stored = JSON.parse(localStorage.getItem('orderItems'));
            if (Array.isArray(stored)) {
                orderItems = stored
            }
        } catch(e) {
            console.error('Invalid data in storage. Resetting');
            localStorage.removeItem('orderItems');
        }

        
        const item = orderItems.find(item => item.code === code);
        if (item) {
            item.qty = newQty;
            localStorage.setItem('orderItems', JSON.stringify(orderItems));

            const subtotalCell = row.querySelector('.tablesubTot');
            const subTotal = item.qty * item.price;
            subtotalCell.textContent = `LKR ${subTotal.toFixed(2)}`;

            let total = 0;
            document.querySelectorAll('.tablesubTot').forEach(cell => {
                const val = parseFloat(cell.textContent.replace('LKR ', ''));
                total += val;
            });

            document.querySelector('.totalOrder').textContent = `LKR ${total.toFixed(2)}`
        }
    });
});


document.querySelectorAll('.deleteItem').forEach(button => {
    button.addEventListener('click', () => {
        const code = button.dataset.code;

        let orderItems = [];
        try {
            const stored = JSON.parse(localStorage.getItem('orderItems'));
            if (Array.isArray(stored)) {
                orderItems = stored;
            }
        } catch (e) {
            console.error('Invalid data in storage');
        }

        orderItems = orderItems.filter(item => item.code !== code);
        localStorage.setItem('orderItems', JSON.stringify(orderItems));

        button.closest('tr').remove();
        alert('Item removed from cart.')
        updateTotal();
    });
});


document.querySelector('.clearCart').addEventListener('click', () => {
    localStorage.removeItem('orderItems');
    document.querySelector('.orderInfo').innerHTML = '';
    updateTotal();
    alert('Cart Cleared.')
});


document.querySelector('.addFav').addEventListener('click', () => {
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    localStorage.setItem('favItems', JSON.stringify(orderItems));
    alert('Successfully added to favourties!')
});

document.querySelector('.applyFav').addEventListener('click', () => {
    const favItems = JSON.parse(localStorage.getItem('favItems')) || [];
    
    localStorage.setItem('orderItems', JSON.stringify(favItems));
    alert('Favourites have been added to cart!')
    location.reload();
});


document.querySelector('form').addEventListener('submit', () => {
    const today = new Date();//Getting today's date and time
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 8);//Set the delivery date to 08 days from the date of order placement

    const formatted = deliveryDate.toISOString().split('T')[0];//Using formatting to make the date readable
    
    alert('Payment Successful! Order will be delivered on ' + formatted);
    localStorage.removeItem('orderItems');//Clear the cart after the successful order placement
    document.querySelector('.orderInfo').innerHTML = '';
    location.reload();//refresh page to view updated cart
});