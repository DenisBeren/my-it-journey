// @ts-nocheck
// Класс, описывающий одну задачу
class Task {
    constructor(text, completed = false) {
        this.id = Date.now();
        this.text = text;
        this.completed = completed;
    }

    toggle() {
        this.completed = !this.completed;
    }
}

// Класс, управляющий списком задач
class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';   // ← обязательно
        this.loadFromStorage();
    }

    addTask(text) {
        const task = new Task(text);
        this.tasks.push(task);
        this.saveToStorage();
        this.render();
        this.updateStats();
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToStorage();
        this.render();
        this.updateStats();
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggle();
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    saveToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            const plainTasks = JSON.parse(saved);
            this.tasks = plainTasks.map(t => new Task(t.text, t.completed));
        }
    }

    render() {
        const list = document.getElementById('taskList');
        list.innerHTML = '';

        let tasksToRender = this.tasks;
        if (this.currentFilter === 'active') {
            tasksToRender = this.tasks.filter(task => !task.completed);
        } else if (this.currentFilter === 'completed') {   // ← исправлено на this.currentFilter
            tasksToRender = this.tasks.filter(task => task.completed);
        }

        tasksToRender.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">Удалить</button>
            `;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.querySelector('span').addEventListener('click', () => {
                this.toggleTask(task.id);
            });
            li.querySelector('.delete-btn').addEventListener('click', () => {
                this.removeTask(task.id);
            });
            list.appendChild(li);
        });
        this.updateStats();
    }

    updateStats() {   // ← метод добавлен внутрь класса
        document.getElementById('totalTasks').textContent = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('remainingTasks').textContent = this.tasks.length - completed;
    }
}   // ← здесь класс TaskManager ЗАКРЫТ

// ===== Глобальный код (вне класса) =====

const manager = new TaskManager();
manager.render();
manager.updateStats();

const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');

function addTaskHandler() {
    const text = input.value.trim();
    if (text) {
        manager.addTask(text);
        input.value = '';
    }
}

addBtn.addEventListener('click', addTaskHandler);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskHandler();
    }
});

// Фильтрация
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');
        manager.currentFilter = btn.dataset.filter;
        manager.render();
    });
});

// Экспорт и импорт (можно оставить как было, если уже добавили)
document.getElementById('exportBtn')?.addEventListener('click', () => {
    const data = JSON.stringify(manager.tasks);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();
    URL.revokeObjectURL(url);
});

document.getElementById('importFile')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const tasksData = JSON.parse(event.target.result);
            if (Array.isArray(tasksData)) {
                manager.tasks = tasksData.map(t => new Task(t.text, t.completed));
                manager.saveToStorage();
                manager.render();
            }
        } catch (err) {
            alert('Ошибка чтения файла');
        }
    };
    reader.readAsText(file);
});