fetch('../JSON/priceinfo.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            const container = document.querySelector(`[data-product='${product.code}']`); //finds the unique product code in each contianer
            if (container) {
                const nameEL = container.querySelector('.prodName'); //Finds the relevant class for the product name
                nameEL.textContent = `${product.name}`;

                const priceEL = container.querySelector('.prodPrice');//Finds the relevant class for the product price
                priceEL.textContent = `LKR ${product.price}`

                const imageEL = container.querySelector('.prodImage');//Finds the relevant class for the product image
                imageEL.src = `${product.image}`
            }
        });
    })
    .catch(error => console.error('Fetch error', error));



document.querySelectorAll('.addtoCart').forEach(button => {
    button.addEventListener('click', () => {
        const container = button.closest('.product');
        const code = container.dataset.product;
        const name = container.querySelector('.prodName').textContent;
        const price = parseFloat(container.querySelector('.prodPrice').textContent.replace('LKR ', '').replace(',',''));
        const qty = parseInt(container.querySelector('.prodQty').value);

        const cartItem = {code, name, price, qty};
        let cartItems = [];

        try {
            const stored = JSON.parse(localStorage.getItem('cartItems'));
            if (Array.isArray(stored)) {
                cartItems = stored;
            }
        } catch (e) {
            console.error('Invalid data in storage. Resetting');
            localStorage.removeItem('cartItems');
        }

        const exist = cartItems.find(p => p.code === code);

        if(exist){
            exist.qty += qty
        } else {
            cartItems.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Item has been added to cart successfully!')
        console.log("button was clicked")
    });
});