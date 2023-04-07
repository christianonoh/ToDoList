/* eslint-disable import/no-cycle */
import {
  updateLocalStorage, reindexTasks, displayAllTasks, tasksArray,
} from './task.js';

function deleteTask(index) {
  tasksArray.splice(index - 1, 1);
  reindexTasks();
  displayAllTasks();
  updateLocalStorage();
}

export default deleteTask;