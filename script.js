const cartItems = document.querySelector('.cart-items');
const totalEl = document.querySelector('.total');
const placeOrderBtn = document.querySelector('.place-order');
let cart = [];

document.querySelectorAll('.card button').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({name, price, qty: 1});
    }

    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.textContent = `${item.name} x ${item.qty} - ₹${item.price * item.qty}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.addEventListener('click', () => {
      cart = cart.filter(i => i.name !== item.name);
      updateCart();
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
  totalEl.textContent = `Total: ₹${total}`;
}

placeOrderBtn.addEventListener('click', () => {
  if(cart.length === 0){
    alert('Cart is empty!');
    return;
  }
  
  let orderMsg = 'Hello! I want to place this order:\n';
  cart.forEach(item => {
    orderMsg += `${item.name} x ${item.qty} - ₹${item.price * item.qty}\n`;
  });
  orderMsg += totalEl.textContent;

  // WhatsApp link
  let phoneNumber = '919999999999'; // Replace with your WhatsApp number
  let waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMsg)}`;
  window.open(waLink, '_blank');

  cart = [];
  updateCart();
});