// Array para armazenar os itens do carrinho
let cartItems = [];
let cartTotal = 0;

//Função para adicionar um item ao carrinho
function addToCart(itemName, itemPrince) {
    let found = false;
    cartItems.forEach((item) => {
        if (item.name === itemName) {
            item.quantity += 1;
            found = true;
        }
    });
    
    if (!found) {
        cartItems.push({ name: itemName, price: itemPrince, quantity: 1});
    }

    cartTotal += itemPrince;
    updateCart();
}

// Função para romover um item do carrinho
function removeFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
        const removedItem = cartItems.splice(index, 1)[0];
        cartTotal -= removedItem.price * removedItem.quantity;
        updateCart();
    }
}

//Função para atualizar o carrinho na página
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartListElement = document.getElementById('cart-list');

    cartItemsElement.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);

    //Atualiza a lista de itens no carrinho
    cartListElement.innerHTML = '';
    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Quantidade: ${item.quantity} - Subtotal: R$${(item.price * item.quantity).toFixed(2)}`;
        cartListElement.appendChild(li);

        // Adiciona um botão "Remover" para cada item no carrinho
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);
    });
}