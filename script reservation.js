const today = new persianDate().toCalendar('persian');
const maxDate = new persianDate().add('days', 10).toCalendar('persian');

$("#datePicker").persianDatepicker({
  format: "YYYY/MM/DD",
  minDate: today,
  maxDate: maxDate,
  autoClose: true,
  toolbox: { calendarSwitch: { enabled: false } },
  dayPicker: {
    onSelect: function(unix) {
      const selectedDate = new persianDate(unix).toCalendar('persian');
      const weekday = new persianDate(unix).format('dddd');
      updateTimeOptions(weekday);
    }
  }
});

function updateTimeOptions(weekday) {
  const timeSelect = document.getElementById("timeSelect");
  timeSelect.innerHTML = "";

  let start = weekday === "جمعه" ? 17 : 11;
  for (let hour = start; hour <= 22; hour++) {
    timeSelect.innerHTML += `<option value="${hour}:00">${hour}:00</option>`;
    timeSelect.innerHTML += `<option value="${hour}:30">${hour}:30</option>`;
  }
  timeSelect.innerHTML += `<option value="23:00">23:00</option>`;
}

document.getElementById("reservationForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = {
    name: this.name.value,
    phone: this.phone.value,
    date: this.datePicker.value,
    time: this.timeSelect.value
  };
  console.log("رزرو ثبت شد:", data);
  // اینجا می‌تونی اطلاعات رو به همراه لیست خرید به فاکتور اضافه کنی
});





const invoiceList = document.getElementById('invoice-list');
const invoiceTotal = document.getElementById('invoice-total');

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
let total = 0;

Object.entries(cartItems).forEach(([key, item]) => {
  const li = document.createElement('li');
  const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
  const itemTotal = priceNum * item.quantity;
  total += itemTotal;

  li.innerHTML = `
    <span>${item.title} (${item.quantity}×)</span>
    <span>${itemTotal.toLocaleString('fa-IR')} تومان</span>
  `;
  invoiceList.appendChild(li);
});

invoiceTotal.textContent = total.toLocaleString('fa-IR');






document.getElementById("finalSubmitBtn").addEventListener("click", function(e) {
  e.preventDefault();

  const name = document.querySelector('[name="name"]').value;
  const phone = document.querySelector('[name="phone"]').value;
  const date = document.getElementById("datePicker").value;
  const time = document.getElementById("timeSelect").value;

  if (!name || !phone || !date || !time) {
    alert("لطفاً تمام فیلدها را کامل کنید.");
    return;
  }

  const reservationData = {
    name,
    phone,
    date,
    time,
    cart: JSON.parse(localStorage.getItem("cartItems")) || {}
  };

  localStorage.setItem("reservationData", JSON.stringify(reservationData));
  window.location.href = "payment-demo.html";
});
