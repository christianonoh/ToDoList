/* eslint-disable import/no-cycle */
import { updateLocalStorage, tasksArray, displayAllTasks } from './task.js';

function toggleCompleted(index) {
  const task = tasksArray[index - 1];
  task.completed = !task.completed;
  updateLocalStorage();
  displayAllTasks();
}

export default toggleCompleted;