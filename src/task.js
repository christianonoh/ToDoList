import { addTask, deleteTask } from './modifyTask.js';
export default class Task {
  constructor() {
    this.taskContainer = document.getElementById("tasks");
    this.clearButton = document.getElementById("clear-button");
    this.submitButton = document.getElementById("submit-button");
    this.tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];
    this.main = document.querySelector(".main");
    this.init();
  }

  init() {
    this.tasksArray.forEach((task) => this.displayTasks(task));
    this.main.addEventListener('click', (event) => {
      if (event.target.classList.contains("delete-task")) {
        const { index } = event.target.parentElement.parentElement.dataset;
        deleteTask.call(this,index);
      } else if (event.target.matches(".submit-button")) {
        const description = document.getElementById("task-description").value;
        if (description === "") {
          event.target.preventDefault();
        } else {
          addTask.call(this, description);
        }
      }  else if (event.target.matches("#clear-button")) {
        this.tasksArray = this.tasksArray.filter((task) => !task.completed);
        this.reindexTasks();
        this.displayAllTasks();
        this.updateLocalStorage();
      }
    });

    this.taskContainer.addEventListener("input", (event) => {
      if (event.target.classList.contains("description")) {    
        const { index } = event.target.parentElement.parentElement.dataset;
        const newDescription = event.target.textContent;
        this.editTask(index, newDescription);
      } else if (event.target.classList.contains("checkbox")) {
        const { index } = event.target.parentElement.parentElement.dataset;
        this.toggleCompleted(index);
      }
    });
  }

  editTask(index, newDescription) {
    const task = this.tasksArray[index - 1];
    task.description = newDescription;
    this.updateLocalStorage();
  }

  reindexTasks() {
    this.tasksArray.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  displayTasks(task) {
    const completedStatus = task.completed ? 'checked' : '';
    const taskClass = task.completed ? 'task-completed' : '';
    this.taskContainer.innerHTML += `
      <li class="task-item" data-index="${task.index}">
        <span class="task-item-content">
          <input type="checkbox" class="checkbox" ${completedStatus}> 
          <span contenteditable="true" class="description ${taskClass}">${task.description}</span>
        </span>
        <span class="move-task">
          <i class="delete-task fa fa-trash-o" aria-hidden="true"></i>
          <i class="fa mover fa-ellipsis-v" aria-hidden="true"></i>
        </span>
      </li>`;
    document.getElementById('task-description').value = '';
  }

  displayAllTasks() {
    this.taskContainer.innerHTML = '';
    this.tasksArray.forEach((task) => this.displayTasks(task));
  }

  updateLocalStorage() {
    localStorage.setItem('tasksArray', JSON.stringify(this.tasksArray));
  }

  toggleCompleted(index) {
    const task = this.tasksArray[index - 1];
    task.completed = !task.completed;
    this.updateLocalStorage();
    this.displayAllTasks();
  }
}
