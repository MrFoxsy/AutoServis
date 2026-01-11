// ===== Навигация =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Закрыть меню при клике на ссылку
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// ===== Карусель для галереи =====
let currentSlide = 0;
let autoSlideInterval;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Скрыть все слайды
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Убрать активный класс со всех индикаторов
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    // Показать текущий слайд
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(index) {
    showSlide(index);
}

// Автоматическое переключение слайдов
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Остановить авто-переключение при наведении на карусель
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Инициализация карусели
showSlide(0);
startAutoSlide();

// ===== Фильтрация галереи =====
function filterGallery(category) {
    const slides = document.querySelectorAll('.carousel-slide');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Обновить активную кнопку фильтра
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Показать/скрыть слайды
    let visibleCount = 0;
    slides.forEach((slide, index) => {
        const slideCategory = slide.dataset.category;

        if (category === 'all' || slideCategory === category || slideCategory.includes(category)) {
            slide.style.display = 'none'; // Изначально скрыть
            slide.classList.remove('active');
            setTimeout(() => {
                slide.style.display = 'block';
                if (visibleCount === 0) {
                    slide.classList.add('active');
                }
            }, 0);
            visibleCount++;
        } else {
            slide.style.display = 'none';
            slide.classList.remove('active');
        }
    });

    // Сбросить индикаторы
    indicators.forEach(indicator => indicator.classList.remove('active'));
    if (visibleCount > 0) {
        indicators[0].classList.add('active');
    }

    currentSlide = 0;
}

// ===== Модальное окно для изображений =====
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

function openModal(img) {
    if (img.tagName === 'IMG') {
        modal.style.display = 'block';
        modalImg.src = img.src;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Закрыть модальное окно при клике вне изображения
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Закрыть модальное окно при нажатии Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ===== Форма контактов =====
function submitForm(event) {
    event.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Простая валидация
    if (!name || !phone) {
        showMessage('Пожалуйста, заполните обязательные поля (имя и телефон)', 'error', formMessage);
        return;
    }

    // Валидация телефона (простая проверка)
    const phoneRegex = /[\d\s\-\+\(\)]{10,}/;
    if (!phoneRegex.test(phone)) {
        showMessage('Пожалуйста, введите корректный номер телефона', 'error', formMessage);
        return;
    }

    // Валидация email если заполнен
    if (email && !isValidEmail(email)) {
        showMessage('Пожалуйста, введите корректный email', 'error', formMessage);
        return;
    }

    // Здесь можно отправить данные на сервер
    // Пока просто показываем успешное сообщение
    showMessage('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.', 'success', formMessage);

    // Очистить форму
    document.querySelector('form').reset();

    // Скрыть сообщение через 5 секунд
    setTimeout(() => {
        formMessage.classList.remove('success');
    }, 5000);
}

function showMessage(text, type, element) {
    element.textContent = text;
    element.className = `form-message ${type}`;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Привязать функцию к кнопке отправки
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', submitForm);
}