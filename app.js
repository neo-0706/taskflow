const taskInput = document.querySelector('.c-form__input');
const addButton = document.querySelector('.c-form__button');
const form = document.querySelector('.c-form');
const taskList = document.querySelector('.content-bottom');
const clearButton = document.querySelector('.button-86');

document.addEventListener('DOMContentLoaded', loadTasks);

addButton.addEventListener('click', e => {
    e.preventDefault();
    addTask();
});

form.addEventListener('submit', e => {
    e.preventDefault();
    addTask();
});

taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});

clearButton.addEventListener('click', clearAllTasks);

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    taskList.innerHTML = '';

    const tasks = getTasksFromStorage();

    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
}

function addTask() {

    const text = taskInput.value.trim();

    if (!text) {
        taskInput.focus();
        return;
    }

    for (const task of taskList.children) {
        const item = task.querySelector('span').textContent;

        if (item === text) {
            alert("The task has already been written.");
            return;
        }
    }

    const task = {
        id: Date.now(),
        text,
        completed: false
    };

    const tasks = getTasksFromStorage();
    tasks.push(task);
    saveTasks(tasks);

    taskList.appendChild(createTaskElement(task));

    taskInput.value = '';
    taskInput.focus();
}

function createTaskElement(task) {

    const li = document.createElement('li');
    li.className = 'scrollbar-glass';

    if (task.completed) {
        li.classList.add('completed');
    }

    li.dataset.id = task.id;

    li.innerHTML = `
        <div class="task-box">
            <button class="check-btn" aria-label="complete task"></button>
            <span class="task-text">${escapeHTML(task.text)}</span>
        </div>
        <button class="delete-btn" aria-label="delete task">🗑️</button>
    `;

    // Complete Task
    li.querySelector('.check-btn').addEventListener('click', () => {

        li.classList.toggle('completed');

        const tasks = getTasksFromStorage();

        const current = tasks.find(t => t.id == task.id);

        if (current) {
            current.completed = !current.completed;
            saveTasks(tasks);
        }

    });

    // Delete Task
    li.querySelector('.delete-btn').addEventListener('click', () => {

        li.remove();

        let tasks = getTasksFromStorage();

        tasks = tasks.filter(t => t.id != task.id);

        saveTasks(tasks);

    });

    return li;
}

function clearAllTasks() {

    taskList.innerHTML = '';

    localStorage.removeItem('tasks');

}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}