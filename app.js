// const checkBtn = document.querySelector('.check-btn');

// checkBtn.addEventListener("click", () => {
//     task.classList.toggle("completed");
// });

const taskInput   = document.querySelector('.c-form__input');
const addButton   = document.querySelector('.c-form__button');
const form        = document.querySelector('.c-form');
const taskList    = document.querySelector('.content-bottom');
const clearButton = document.querySelector('.button-86');

function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        taskInput.focus();
        return;
    }

    const taskItem = createTaskElement(text);

    taskList.appendChild(taskItem);
    taskInput.value = '';
    taskInput.focus();
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.classList.add('scrollbar-glass');

    li.innerHTML = `
        <div class="task-box">
            <button class="check-btn" aria-label="complete task"></button>
            <span class="task-text">${escapeHTML(text)}</span>
        </div>
        <button class="delete-btn" aria-label="delete task">🗑️</button>
    `;

// need some changes
    li.querySelector('.check-btn').addEventListener('click', () => {
        li.classList.toggle('completed');
    });
 
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });
 
    return li;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

addButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    addTask();
});

taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

document.querySelectorAll('.content-bottom .scrollbar-glass').forEach(item => {
    item.querySelector('.check-btn')?.addEventListener('click', () => {
        item.classList.toggle('completed');
    });
 
    item.querySelector('.delete-btn')?.addEventListener('click', () => {
        item.remove();
    });
});

clearButton.addEventListener('click', () => {
    taskList.innerHTML = "";
})