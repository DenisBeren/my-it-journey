// Находим кнопку на странице по её id
const greetButton = document.getElementById('greetBtn');

// Функция, которая покажет приветствие
function sayHello() {
    alert('Привет! Добро пожаловать на мою страницу-визитку. Я только учусь программировать, и это моя первая интерактивная кнопка!');
}

// "Вешаем" обработчик события: при клике на кнопку вызываем функцию sayHello
greetButton.addEventListener('click', sayHello);
// Работа с именем пользователя
const nameSpan = document.getElementById('userName');

// Функция смены имени
function changeName() {
    const newName = prompt('Введите ваше имя:', nameSpan.textContent);
    if (newName && newName.trim() !== '') {
        nameSpan.textContent = newName.trim();
    }
}

// При клике на имя — вызываем функцию смены
nameSpan.addEventListener('click', changeName);

// Меняем курсор, чтобы было понятно, что имя кликабельно
nameSpan.style.cursor = 'pointer';
nameSpan.title = 'Нажмите, чтобы изменить имя';
// Плавная прокрутка
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Автоматическое обновление года
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
// Переключатель темы
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
} else {
    themeToggle.textContent = '🌓';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌓';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
// Форма обратной связи
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // отменяем стандартную отправку

    // Сбрасываем ошибки
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    formFeedback.textContent = '';
    let isValid = true;

    // Проверка имени (не пустое)
    if (nameInput.value.trim() === '') {
        document.getElementById('nameError').textContent = 'Пожалуйста, введите имя';
        isValid = false;
    }

    // Проверка email (простая регулярка)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        document.getElementById('emailError').textContent = 'Введите корректный email';
        isValid = false;
    }

    // Проверка сообщения (минимум 10 символов)
    if (messageInput.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Сообщение должно содержать минимум 10 символов';
        isValid = false;
    }

    if (isValid) {
        formFeedback.textContent = '✅ Сообщение отправлено! (пока что в никуда, но форма работает)';
        formFeedback.style.color = 'green';
        contactForm.reset();
        // Здесь позже можно будет добавить реальную отправку на сервер
    } else {
        formFeedback.textContent = '❌ Пожалуйста, исправьте ошибки в форме';
        formFeedback.style.color = 'red';
    }
});