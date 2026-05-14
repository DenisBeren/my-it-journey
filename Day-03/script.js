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