fetch('./JSON/priceinfo.json')
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