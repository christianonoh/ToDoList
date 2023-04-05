export function addTask(des) {
  const newTask = {
    description: des,
    index: this.tasksArray.length + 1,
    completed: false,
  };
  this.tasksArray.push(newTask);
  this.displayTasks(newTask);
  this.updateLocalStorage();
}

export function deleteTask(index) {
  this.tasksArray.splice(index - 1, 1);
  this.reindexTasks();
  this.displayAllTasks();
  this.updateLocalStorage();
}
