/* eslint-disable no-unused-vars */
// import _ from "lodash";
import './style.css';

class Task {
  constructor() {
    this.taskContainer = document.getElementById('tasks');
    this.clearButton = document.getElementById('clear-button');
    this.submitButton = document.getElementById('submit-button');
    this.tasksArray = [];
    this.init();
  }

  init() {
    this.tasksArray.forEach((task) => this.displayTasks(task));
    this.submitButton.addEventListener('click', (btn) => {
      const description = document.getElementById('task-description').value;
      if (description === '') { btn.preventDefault(); } else { this.addTask(description); }
    });

    this.taskContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-task')) {
        const { index } = event.target.parentElement.parentElement.dataset;
        this.deleteTask(index);
      }
    });
  }

  addTask(des) {
    const newTask = {
      description: des,
      index: this.tasksArray.length,
      completed: false,
    };
    this.tasksArray.push(newTask);
    this.displayTasks(newTask);
    this.reindexTasks();
  }

  deleteTask(index) {
    this.tasksArray.splice(index, 1);
    this.reindexTasks();
    this.displayAllTasks();
  }

  reindexTasks() {
    this.tasksArray.forEach((task, index) => {
      task.index = index;
    });
  }

  displayTasks(task) {
    this.taskContainer.innerHTML += `
      <li class="task-item" data-index="${task.index}">
        <span class="task-item-content">
          <input type="checkbox">
          <span contenteditable="true" class="description">${task.description}</span>
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
}

const tasksArray = new Task();
