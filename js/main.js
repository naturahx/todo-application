const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

if (localStorage.getItem('htmlTasks')) {
  tasksList.innerHTML = localStorage.getItem('htmlTasks');
};

//Добавление задачи:
form.addEventListener('submit', addTask);
function addTask(event) {
  // Отмена отправки:
  event.preventDefault();
  // Достаём нашу задачу(text) с инпута:
  const taskText = taskInput.value;   // value - это значение написанное в инпуте
  // Формируем разметку для новой задачи:
  const taskHTML = ` <li class="list-group-item d-flex justify-content-between task-item">
                 <span class="task-title">${taskText}</span>
             <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                   <img src="./img/tick.svg" alt="Done" width="18" height="18">
                 </button>
                 <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                 </button>
             </div>
                </li> `;
  // Добавляем задачу на страницу:
  tasksList.insertAdjacentHTML('beforeend', taskHTML)
  // Очищаем поле ввода + оставляем фокус на нём:
  taskInput.value = '';
  taskInput.focus();
  // Убираем "Блок - The ToDo list is empty"
  if (tasksList.children.length > 1) {
    emptyList.classList.add('none');
  };
  saveLS();
};

//Удаление задачи:
tasksList.addEventListener('click', deleteTask);
function deleteTask(event) {
  // Проверяем, что клик был именно по кнопке delete:
  if (event.target.dataset.action == 'delete') {
  const parentNode = event.target.closest('.list-group-item');
  parentNode.remove();
  }
  if (tasksList.children.length === 1) {
    emptyList.classList.remove('none');
  };
  saveLS();
};

//Отмечаем задачу завершенной:
tasksList.addEventListener('click', doneTask);
function doneTask(event) {
  // Проверяем, что клик был именно по кнопке done:
  if (event.target.dataset.action == 'done') {
    const parentNode = event.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
  };
  saveLS();
};

//Самый просто способ сохранить данные в localStorage:
function saveLS() {
  localStorage.setItem('htmlTasks', tasksList.innerHTML)
}