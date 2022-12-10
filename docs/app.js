
// Находим элементы на странице
const taskInput = document.querySelector('.form-control');
const form = document.querySelector('.form');
const tasksList = document.querySelector('.list-group');
const todoClear = document.querySelector('.todo__clear');
const changeTheme = document.querySelector('.change__theme');
const body = document.querySelector('body');


let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(task => {

    // Формируем разметку для новой задачи

    const taskHTML = `
     <li id="${task.id}" class="list-group-item">
         <span class="note">${task.text}</span>
         <div>
             <button type="button" class="btn btn-danger">Удалить</button>
         </div>
     </li>
     `
    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
});

// Добавление задачи
form.addEventListener('submit', addTask)
// Удаление задачи
tasksList.addEventListener('click', deleteTask);

changeTheme.addEventListener('click', change__theme);

if (tasksList.children.length > 0) {
    todoClear.classList.add('none');
}


// Функции

function addTask(event) {

    // Отменяем отправку формы
    event.preventDefault();

    // Достаем текст задачи из поля ввода
    const taskText = taskInput.value;

    // Описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
    };

    // Добавляем задачу в массив tasks

    tasks.push(newTask)


    // Формируем разметку для новой задачи

    const taskHTML = `
    <li id="${newTask.id}" class="list-group-item">
        <span class="note">${newTask.text}</span>
        <div>
            <button type="button" class="btn btn-danger">Удалить</button>
        </div>
    </li>
    `
    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // Очищаем поле ввода и возвращаем фокус на него
    taskInput.value = '';
    taskInput.focus();

    if (tasksList.children.length > 0) {
        todoClear.classList.add('none');
    }
    saveToLocalStorage();

}

function deleteTask(event) {

    // Проверяем если клик был НЕ по кнопке "Удалить задачу"

    if (!event.target.classList.contains('btn-danger')) return;

    // Проверяем, что клик был по кнопке удалить задачу
    const parentNode = event.target.closest('li');

    // Определяем  id задачи
    const id = Number(parentNode.id);

    // Находим индекс задачи в массиве
    const index = tasks.findIndex((task) => task.id === id);

    // Удаляем задачу из массива
    tasks.splice(index, 1);

    // Удаляем задачу из разметки 
    parentNode.remove();

    // Проверка. Если в списке задач 0 элементов, показываем блок "Список дел пуст":
    if (tasksList.children.length === 0) {
        todoClear.classList.remove('none');
    }

    saveToLocalStorage()

}



function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function change__theme(event) {
    event.preventDefault();

    if (event.target.classList.contains('svg__lite')) {
        body.classList.remove('dark__theme');
        body.classList.add('lite__theme');

    } else if (event.target.classList.contains('svg__dark')) {
        body.classList.remove('lite__theme');
        body.classList.add('dark__theme');
    }
}

