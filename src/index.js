/* eslint-disable no-unused-vars */
import _ from 'lodash';
import './style.css';

const tasksArray = [
  {
    description: 'Learn JavaScript',
    completed: false,
    index: 1,
  },
  {
    description: 'Buy groceries',
    completed: true,
    index: 2,
  },
  {
    description: 'Go for a run',
    completed: false,
    index: 3,
  },
];

const taskList = document.getElementById('tasks');
tasksArray.forEach((task) => {
  taskList.innerHTML += `
  <li class="task-item">
  <span class="task-item-content">
    <input type="checkbox">
    <span class="description">${task.description}</span>
  </span>
  <span class="move-task">
  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
  </span>
</li>`;
});

// class Tasks{
//   constructor() {
//     this.taskList = document.getElementById('tasks');
//     this.submitButton = document.getElementById('submitButton');
//     this.
//   }
// }

// document.body.appendChild(component());