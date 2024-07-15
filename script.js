document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items');

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('col-md-4', 'mb-3');
            itemDiv.innerHTML = `
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex justify-content-center align-items-center">
                        <div>
                        
                        
                            <img class="product-img" src="${item.image}" alt="">
                                     <p class="card-text">${item.name}</p>
                                                         <p class="fw-bold">${item.price} FCFA</p>

                            <div class="d-flex justify-content-between">
                                <p class="card-text">Quantité: ${item.quantity}</p>
                                <i class="fa-solid fa-trash cart remove-item" data-name="${item.name}"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                removeFromCart(button.getAttribute('data-name'));
            });
        });
    }

    document.querySelectorAll('.boutonballerine').forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price')),
                image: button.getAttribute('data-image'),
                quantity: 1
            };

            addToCart(product);
        });
    });

    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }

    function removeFromCart(productName) {
        const productIndex = cart.findIndex(item => item.name === productName);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
        }
    }

    updateCartCount();
    displayCartItems();
});
