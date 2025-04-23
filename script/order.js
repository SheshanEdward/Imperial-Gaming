fetch('./JSON/order.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(order => {
            const container = document.querySelector(`[data-order='${order.code}']`); //finds the unique product code in each contianer
            if (container) {
                const nameEL = container.querySelector('.orderName'); //Finds the relevant class for the product name
                nameEL.textContent = `${order.name}`;

                const priceEL = container.querySelector('.orderPrice');//Finds the relevant class for the product price
                priceEL.textContent = `LKR ${order.price}`

                const imageEL = container.querySelector('.orderImage');//Finds the relevant class for the product image
                imageEL.src = `${order.image}`
            }
        });
    })
    .catch(error => console.error('Fetch error', error));

    
    
    
document.querySelectorAll('.addtoCart').forEach(button => {
    button.addEventListener('click', () => {
        const container = button.closest('.order');
        const code = container.dataset.order;
        const name = container.querySelector('.orderName').textContent;
        const price = parseFloat(container.querySelector('.orderPrice').textContent.replace('LKR ', '').replace(',',''));
        const qty = parseInt(container.querySelector('.orderQty').value);
    
        const orderItem = {code, name, price, qty};
        let orderItems = [];
    
        try {
            const stored = JSON.parse(localStorage.getItem('orderItems'));
            if (Array.isArray(stored)) {
                orderItems = stored;
            }
        } catch (e) {
            console.error('Invalid data in storage. Resetting');
            localStorage.removeItem('orderItems');
        }
    
        const exist = orderItems.find(o => o.code === code);
    
        if(exist){
            exist.qty += qty
        } else {
            orderItems.push(orderItem);
        }
    
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        alert('Item has been added to cart successfully!')
        location.reload();
    });
});