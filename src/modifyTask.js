import { displayTasks, updateLocalStorage, reindexTasks, displayAllTasks, tasksArray } from './task';

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
  
  function deleteTask(index) {
  tasksArray.splice(index - 1, 1);
  reindexTasks();
  displayAllTasks();
  updateLocalStorage();
  }

export { addTask, deleteTask };