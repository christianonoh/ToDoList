/* eslint-disable import/no-cycle */
import { displayTasks, updateLocalStorage, tasksArray } from './task.js';

function addTask(des) {
  const newTask = {
    description: des,
    index: tasksArray.length + 1,
    completed: false,
  };
  tasksArray.push(newTask);
  displayTasks(newTask);
  updateLocalStorage();
}

export default addTask;