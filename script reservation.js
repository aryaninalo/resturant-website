document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('time-toggle');
  const dropdown = document.getElementById('time-list');

  if (!toggleBtn || !dropdown) return;

  // ساخت بازه‌های نیم‌ساعته از 11:00 تا 23:00
  const timeSlots = [];
  for (let h = 11; h < 23; h++) {
    timeSlots.push(`${h.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${h.toString().padStart(2, '0')}:30`);
  }

  // ساخت گزینه‌ها
  timeSlots.forEach(slot => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'time-slot';
    radio.value = slot;

    radio.addEventListener('change', () => {
      // نمایش بازه انتخاب‌شده فقط داخل دکمه
      toggleBtn.textContent = slot;
      dropdown.style.display = 'none';
    });

    label.appendChild(radio);
    label.append(` ${slot}`);
    dropdown.appendChild(label);
  });

  // باز و بسته کردن منو با کلیک روی فیلد
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  // بستن منو با کلیک بیرون
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-wrapper')) {
      dropdown.style.display = 'none';
    }
  });
});



$(document).ready(function () {
  // تاریخ رزرو: امروز
  const reservationDate = new persianDate().startOf('day');

  // فقط از فردا تا ۱۰ روز بعد قابل انتخاب
  const minDate = reservationDate.clone().add('days', 1);
  const maxDate = reservationDate.clone().add('days', 10);

  // راه‌اندازی تقویم شمسی روی فیلد
  $('#delivery-date').persianDatepicker({
    format: 'YYYY/MM/DD',
    minDate: minDate,
    maxDate: maxDate,
    autoClose: true,
    observer: true,
    initialValue: false,
    calendar: {
      position: {
        x: 0,
        y: 0
      }
    },
    dayPicker: {
      titleFormat: 'YYYY MMMM',
      highlightToday: true,
      highlightSelectedDay: true,
      disable: function (unix) {
        const date = new persianDate(unix);
        // غیرفعال‌سازی جمعه‌ها
        return date.day() === 6;
      }
    },
    onSelect: function (unix) {
      const selected = new persianDate(unix).format('YYYY/MM/DD');
      $('#delivery-date').val(selected);
      console.log('تاریخ انتخاب‌شده:', selected);
    }
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const invoiceBody = document.getElementById('invoice-body');
  const invoiceTotal = document.getElementById('invoice-total');

  const cartData = localStorage.getItem('cartItems');
  if (!cartData) return;

  const cartItems = JSON.parse(cartData);
  let total = 0;

  Object.values(cartItems).forEach(item => {
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
    const itemTotal = priceNum * item.quantity;
    total += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.title}</td>
      <td>${item.quantity}</td>
      <td>${priceNum.toLocaleString('fa-IR')} تومان</td>
      <td>${itemTotal.toLocaleString('fa-IR')} تومان</td>
    `;
    invoiceBody.appendChild(row);
  });

  invoiceTotal.textContent = `${total.toLocaleString('fa-IR')} تومان`;
});




document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit-reservation');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('user-name')?.value.trim();
    const phone = document.getElementById('user-phone')?.value.trim();
    const date = document.getElementById('delivery-date')?.value.trim();
    const time = document.getElementById('time-toggle')?.textContent.trim();

    // اعتبارسنجی اولیه
    if (!name || !phone || !date || !time || time === 'برای انتخاب بازه زمانی کلیک کنید') {
      alert('لطفاً همه فیلدها را کامل و صحیح وارد کنید.');
      return;
    }

    const cartData = localStorage.getItem('cartItems');
    if (!cartData) {
      alert('سبد خرید شما خالی است.');
      return;
    }

    const cartItems = JSON.parse(cartData);
    let totalAmount = 0;

    Object.values(cartItems).forEach(item => {
      const priceNum = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
      totalAmount += priceNum * item.quantity;
    });

    const order = {
      orderId: 'ORD-' + Date.now(),
      name,
      phone,
      date,
      time,
      items: cartItems,
      total: totalAmount
    };

    localStorage.setItem('finalOrder', JSON.stringify(order));
    localStorage.removeItem('cartItems');

    window.location.href = 'payment-demo.html';
  });
});