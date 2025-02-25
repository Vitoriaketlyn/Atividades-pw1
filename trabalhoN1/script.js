// script.js

// Array para armazenar os itens do carrinho
let cartItems = [];

// Função para adicionar um item ao carrinho
function addToCart(name, price, image) {
    // Verifica se o item já está no carrinho
    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        existingItem.quantity++;
    } else {
        // Se o item não existe, adiciona ao carrinho
        cartItems.push({ name, price, image, quantity: 1 });
    }

    // Atualiza o carrinho na interface
    updateCartUI();
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    let total = 0;

    // Limpa o conteúdo atual do carrinho
    cartItemsContainer.innerHTML = '';

    // Adiciona cada item do carrinho à interface
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
            </div>
            <div class="cart-item-actions">
                <button class="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="increase">+</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);

        // Adiciona eventos aos botões de aumentar/diminuir quantidade
        const decreaseButton = cartItem.querySelector('.decrease');
        const increaseButton = cartItem.querySelector('.increase');

        decreaseButton.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                // Remove o item se a quantidade for 0
                cartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
            }
            updateCartUI();
        });

        increaseButton.addEventListener('click', () => {
            item.quantity++;
            updateCartUI();
        });

        // Calcula o total do item
        total += item.price * item.quantity;
    });

    // Atualiza o total do carrinho
    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    // Se o carrinho estiver vazio, exibe uma mensagem
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        document.querySelector('.cart-total').style.display = 'none';
        document.querySelector('.checkout-btn').style.display = 'none';
    } else {
        document.querySelector('.cart-total').style.display = 'block';
        document.querySelector('.checkout-btn').style.display = 'block';
    }
}

// Adicionar evento de clique aos botões "Adicionar ao Carrinho" no cardápio
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.closest('.menu-item');
        const name = item.querySelector('h3').textContent;
        const price = parseFloat(item.querySelector('.price').textContent.replace('R$ ', '').replace(',', '.'));
        const image = item.querySelector('img').src;

        // Adiciona o item ao carrinho
        addToCart(name, price, image);

        // Feedback visual (opcional)
        alert(`${name} foi adicionado ao carrinho!`);
    });
});

// Evento de clique no botão "Finalizar Compra"
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens para finalizar a compra.');
    } else {
        alert('Compra finalizada com sucesso!');
        cartItems = []; // Limpa o carrinho
        updateCartUI(); // Atualiza a interface
    }
});