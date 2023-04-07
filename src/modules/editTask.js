/* eslint-disable import/no-cycle */
import { updateLocalStorage, tasksArray } from './task.js';

function editTask(index, newDescription) {
  const task = tasksArray[index - 1];
  task.description = newDescription;
  updateLocalStorage();
}

export default editTask;
