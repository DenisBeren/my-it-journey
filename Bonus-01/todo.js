// Получаем элементы
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const list = document.getElementById('taskList');

// Массив для хранения задач (будем синхронизировать с localStorage)
let tasks = [];

// При загрузке страницы читаем сохраненные задачи
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
});

// Функция сохранения в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция отрисовки задач
function renderTasks() {
    list.innerHTML = ''; // очищаем список
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button data-index="${index}" class="delete-btn">Удалить</button>
        `;
        // Если задача выполнена — добавим класс completed
        if (task.completed) {
            li.classList.add('completed');
        }
        // Обработчик клика по тексту (отметить выполненной)
        li.querySelector('span').addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });
        // Обработчик удаления
        li.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        list.appendChild(li);
    });
}

// Добавление новой задачи
function addTask() {
    const text = input.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        input.value = ''; // очищаем поле
        saveTasks();
        renderTasks();
    }
}

// Событие по кнопке
addBtn.addEventListener('click', addTask);

// Добавление по Enter
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});