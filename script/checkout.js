const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartTable = document.querySelector('.cartInfo');
const cartTotal = document.querySelector('.totalAmount');


cartItems.forEach(cartItem => {
    const subTot = cartItem.qty * cartItem.price;

    const tableRow = document.createElement('tr');
    tableRow.setAttribute('data-code',cartItem.code);

    tableRow.innerHTML = `
    <td>${cartItem.name}</td>
    <td>${cartItem.price}</td>
    <td><input type="number" min="1" step="1" class="tableQty" value="${cartItem.qty}" data-code="${cartItem.code}"></td>
    <td class="tablesubTot">LKR ${subTot.toFixed(2)}</td>
    `
    cartTable.appendChild(tableRow);
})

let total = 0;
[...cartTable.rows].forEach(row => {
    const subtotalCell = row.querySelector('.tablesubTot');
    if (subtotalCell){
        total += parseFloat(subtotalCell.textContent.replace('LKR ',''));
    }
});

cartTotal.textContent = `LKR ${total.toFixed(2)}`;