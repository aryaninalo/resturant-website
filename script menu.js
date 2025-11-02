  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });





const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartDetails = document.getElementById('cart-details');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const reserveBtn = document.getElementById('cart-reserve-btn');

let cartItems = {};

function updateCartDisplay() {
  const entries = Object.entries(cartItems);
  const count = entries.reduce((sum, [_, item]) => sum + item.quantity, 0);
  cartCount.textContent = count;

  if (count > 0) {
    cartIcon.classList.remove('hidden');
    cartDetails.classList.remove('hidden');
  } else {
    cartIcon.classList.add('hidden');
    cartDetails.classList.add('hidden');
  }

  cartList.innerHTML = '';
  let total = 0;

  entries.forEach(([key, item]) => {
    const li = document.createElement('li');
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
    total += priceNum * item.quantity;

    li.innerHTML = `
      <span>${item.title} (${item.quantity}×)</span>
      <span>${priceNum.toLocaleString('fa-IR')} تومان</span>
      <button class="remove-btn" data-key="${key}">✖</button>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = total.toLocaleString('fa-IR');

  // حذف آیتم
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      delete cartItems[key];
      updateCartDisplay();
    });
  });

  // بسته شدن خودکار
  clearTimeout(cartDetails.hideTimeout);
  cartDetails.hideTimeout = setTimeout(() => {
    cartDetails.classList.add('hidden');
  }, 5000);
}

// افزودن آیتم
document.querySelectorAll('.menu3-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.menu3-card');
    const title = card.querySelector('.menu3-title').textContent;
    const price = card.querySelector('.menu3-price-num')?.textContent || card.querySelector('.menu3-price').textContent;
    const key = title;

    if (cartItems[key]) {
      cartItems[key].quantity += 1;
    } else {
      cartItems[key] = { title, price, quantity: 1 };
    }

    updateCartDisplay();
  });
});

// کلیک روی آیکون برای باز کردن
cartIcon.addEventListener('click', () => {
  cartDetails.classList.toggle('hidden');
});

// دکمه رزرو
reserveBtn.addEventListener('click', () => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems)); // ذخیره سبد خرید
  window.location.href = 'reservation.html';
});




document.querySelectorAll('.menu-categories button').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });

      // افکت فعال‌سازی دکمه
      document.querySelectorAll('.category-list button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  });
});