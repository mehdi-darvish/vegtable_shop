import { $ , html , getCurrentUser } from "./utilities/utilities.js";

const carts_container = $.querySelector('.cart-container');
const empty_cart = $.getElementById('empty-cart');
const finalOrder_btn = $.querySelector('.order-button');

const basketApi = 'http://localhost:3000/basket';




async function renderBasket() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
   
    carts_container.innerHTML = '';
    empty_cart.style.display = 'flex';
    finalOrder_btn.style.display = 'none';
    return;
  }

  
  const uid = currentUser.userId ?? currentUser.id;
  const res = await fetch(`${basketApi}?userId=${uid}`);
  const data = await res.json();

  if (!data || data.length === 0) {

    carts_container.innerHTML = '';
    empty_cart.style.display = 'flex';
    finalOrder_btn.style.display = 'none';
    return;
    
  }

  empty_cart.style.display = 'none';
  finalOrder_btn.style.display = 'block';

  carts_container.innerHTML = '';
  data.forEach(product => {
   
    carts_container.insertAdjacentHTML('beforeend',
      `<div class="cart-item no-anim" data-basket-id="${product.id}">
          <img src='${product.src}' alt="Product Image">
          <div class= "item-details">
              <h2 class="item-title">${product.title}</h2>
              <div class="quantity-control">
                  <label for="qty-${product.id}">Count:</label>
                  <input data-id="${product.id}" class="qty-input" type="number" id="qty-${product.id}" min="1" max="20" value="${product.quantity}">
              </div>
              <p class="item-price">${(product.price * product.quantity).toFixed(2)}$</p>
          </div>
          <div class="item-actions">
              <button type="button" data-id="${product.id}" class="delete-item" title="Remove"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /> </svg></button>
          </div>
      </div>`
    );
  });

 
  requestAnimationFrame(() => {
    $.querySelectorAll('.cart-item.no-anim').forEach(el => el.classList.remove('no-anim'));
  });
}


async function removeItem(productId) {

  try {
    const res = await fetch(`${basketApi}/${productId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    await renderBasket();

  } catch (err) {
    console.error('Failed to delete item', err);
  }
}


async function updateQuantity(productId, newQty) {
  try {
    const res = await fetch(`${basketApi}/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: Number(newQty) })
    });
    if (!res.ok) throw new Error('Update failed');
    await renderBasket();
  } catch (err) {
    console.error('Failed to update quantity', err);
  }
}


carts_container.addEventListener('click', (e) => {
  const btn = e.target.closest('.delete-item');
  if (!btn) return;
  const id = btn.dataset.id;
  if (!id) return;
  removeItem(id);
});

carts_container.addEventListener('input', (e) => {

  const input = e.target.closest('.qty-input');
  if (!input) return;

  const id = input.dataset.id;
  let val = Number(input.value);

  if (isNaN(val) || val < 1) {
    input.value = 1;
    val = 1;
  }
  
  updateQuantity(id, val);
});


renderBasket();
