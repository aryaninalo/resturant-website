document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const cards = Array.from(track.children);
  let spacing = getSpacing();
  let cardWidth = cards[0].offsetWidth + spacing;
  const speed = 0.5;

  let positions = cards.map((_, i) => i * cardWidth);

  function setPositions() {
    cards.forEach((card, i) => {
      card.style.left = positions[i] + "px";
    });
  }

  setPositions();

  function animate() {
    positions = positions.map(pos => pos - speed);
    setPositions();

    if (positions[0] <= -cardWidth) {
      const first = cards.shift();
      track.appendChild(first);
      positions.shift();
      const lastPos = positions[positions.length - 1];
      positions.push(lastPos + cardWidth);
      cards.push(first);
      first.style.left = positions[positions.length - 1] + "px";
    }

    requestAnimationFrame(animate);
  }

  animate();

  // 🌀 فاصله پویا بر اساس عرض صفحه
  function getSpacing() {
    const w = window.innerWidth;
    if (w <= 480) return 4;
    if (w <= 768) return 8;
    return 32;
  }

  // 📱 واکنش به تغییر سایز صفحه
  window.addEventListener("resize", () => {
    spacing = getSpacing();
    cardWidth = cards[0].offsetWidth + spacing;
    positions = cards.map((_, i) => i * cardWidth);
    setPositions();
  });

  // 👆 کنترل لمسی
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 30) return;

    if (delta > 0) {
      const last = cards.pop();
      cards.unshift(last);
      track.insertBefore(last, track.firstChild);
      positions.pop();
      positions.unshift(positions[0] - cardWidth);
      last.style.left = positions[0] + "px";
    } else {
      const first = cards.shift();
      track.appendChild(first);
      positions.shift();
      const lastPos = positions[positions.length - 1];
      positions.push(lastPos + cardWidth);
      cards.push(first);
      first.style.left = positions[positions.length - 1] + "px";
    }
  }
});

  document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;

    function showImage(index) {
      currentIndex = index;
      lightboxImg.src = images[currentIndex].src;
      lightbox.style.display = 'flex';
    }

    function closeLightbox() {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }

    // اتصال رویدادها
    images.forEach((img, index) => {
      img.addEventListener('click', () => showImage(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // بستن با کلیک خارج از تصویر
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  });



  const buttons = document.querySelectorAll('.category-list button');
  const sections = document.querySelectorAll('.menu-section');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // لرزش یا fade subtle نوار
      const nav = document.querySelector('.menu-categories');
      nav.classList.add('active-transition');
      setTimeout(() => nav.classList.remove('active-transition'), 300);

      // فعال‌سازی دکمه
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // اسکرول نرم به بخش هدف
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // فاصله از بالا برای هدر
          behavior: 'smooth'
        });

        // انیمیشن محو و ظاهر شدن
        sections.forEach(sec => {
          if (sec.id !== targetId) {
            sec.style.opacity = 0.3;
            sec.style.transition = 'opacity 0.3s ease';
          } else {
            sec.style.opacity = 1;
            sec.style.transition = 'opacity 0.4s ease';
          }
        });
      }
    });
  });




