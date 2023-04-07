/* eslint-disable import/no-cycle */
/* eslint-disable import/no-mutable-exports */
import addTask from './addTask.js';
import deleteTask from './deleteTask.js';
import editTask from './editTask.js';
import toggleCompleted from './toggleCompleted.js';
import clearCompleted from './clearCompleted.js';

const taskContainer = document.getElementById('tasks');
export let tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
const main = document.querySelector('.main');

function displayTasks(task) {
  const completedStatus = task.completed ? 'checked' : '';
  const taskClass = task.completed ? 'task-completed' : '';
  taskContainer.innerHTML += `<li class="task-item" data-index="${task.index}"> <span class="task-item-content"> <input type="checkbox" class="checkbox" ${completedStatus}>  <span contenteditable="true" class="description ${taskClass}">${task.description}</span> </span> <span class="move-task"> <i class="delete-task fa fa-trash-o" aria-hidden="true"></i> <i class="fa mover fa-ellipsis-v" aria-hidden="true"></i> </span> </li>`;
  document.getElementById('task-description').value = '';
}

function reindexTasks() {
  tasksArray.forEach((task, index) => {
    task.index = index + 1;
  });
}

function displayAllTasks() {
  taskContainer.innerHTML = '';
  tasksArray.forEach((task) => displayTasks(task));
}

function updateLocalStorage() {
  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
}

function init() {
  tasksArray.forEach((task) => displayTasks(task));
  main.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-task')) {
      const { index } = event.target.parentElement.parentElement.dataset;
      deleteTask(index);
    } else if (event.target.matches('.submit-button')) {
      const description = document.getElementById('task-description').value;
      if (description === '') {
        event.preventDefault();
      } else {
        addTask(description);
      }
    } else if (event.target.matches('#clear-button')) {
      tasksArray = clearCompleted();
      reindexTasks();
      displayAllTasks();
      updateLocalStorage();
    }
  });

  taskContainer.addEventListener('input', (event) => {
    if (event.target.classList.contains('description')) {
      const { index } = event.target.parentElement.parentElement.dataset;
      const newDescription = event.target.textContent;
      editTask(index, newDescription);
    } else if (event.target.classList.contains('checkbox')) {
      const { index } = event.target.parentElement.parentElement.dataset;
      toggleCompleted(index);
    }
  });
}

init();

export {
  reindexTasks, displayTasks, displayAllTasks, updateLocalStorage,
};
