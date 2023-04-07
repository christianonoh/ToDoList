import './style.css';
import { addTask, deleteTask } from './modifyTask.js';

const taskContainer = document.getElementById("tasks");
const clearButton = document.getElementById("clear-button");
const submitButton = document.getElementById("submit-button");
export let tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];
const main = document.querySelector(".main");

function init() {
tasksArray.forEach((task) => displayTasks(task));
main.addEventListener('click', (event) => {
if (event.target.classList.contains("delete-task")) {
const { index } = event.target.parentElement.parentElement.dataset;
deleteTask(index);
} else if (event.target.matches(".submit-button")) {
const description = document.getElementById("task-description").value;
if (description === "") {
event.preventDefault();
} else {
addTask(description);
}
} else if (event.target.matches("#clear-button")) {
tasksArray = tasksArray.filter((task) => !task.completed);
reindexTasks();
displayAllTasks();
updateLocalStorage();
}
});

taskContainer.addEventListener("input", (event) => {
if (event.target.classList.contains("description")) {
const { index } = event.target.parentElement.parentElement.dataset;
const newDescription = event.target.textContent;
editTask(index, newDescription);
} else if (event.target.classList.contains("checkbox")) {
const { index } = event.target.parentElement.parentElement.dataset;
toggleCompleted(index);
}
});
}

function editTask(index, newDescription) {
const task = tasksArray[index - 1];
task.description = newDescription;
updateLocalStorage();
}

function reindexTasks() {
tasksArray.forEach((task, index) => {
task.index = index + 1;
});
}

function displayTasks(task) {
const completedStatus = task.completed ? 'checked' : '';
const taskClass = task.completed ? 'task-completed' : '';
taskContainer.innerHTML +=  `<li class="task-item" data-index="${task.index}"> <span class="task-item-content"> <input type="checkbox" class="checkbox" ${completedStatus}>  <span contenteditable="true" class="description ${taskClass}">${task.description}</span> </span> <span class="move-task"> <i class="delete-task fa fa-trash-o" aria-hidden="true"></i> <i class="fa mover fa-ellipsis-v" aria-hidden="true"></i> </span> </li>`;
document.getElementById('task-description').value = '';
}

function displayAllTasks() {
taskContainer.innerHTML = '';
tasksArray.forEach((task) => displayTasks(task));
}

function updateLocalStorage() {
localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
}

function toggleCompleted(index) {
const task = tasksArray[index - 1];
task.completed = !task.completed;
updateLocalStorage();
displayAllTasks();
}

init();

export {editTask, reindexTasks, displayTasks, displayAllTasks, updateLocalStorage, toggleCompleted };