export default class Task {
  constructor() {
    this.taskContainer = document.getElementById('tasks');
    this.clearButton = document.getElementById('clear-button');
    this.submitButton = document.getElementById('submit-button');
    this.tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
    this.init();
  }

  init() {
    this.tasksArray.forEach((task) => this.displayTasks(task));
    this.submitButton.addEventListener('click', (btn) => {
      const description = document.getElementById('task-description').value;
      if (description === '') {
        btn.preventDefault();
      } else {
        this.addTask(description);
      }
    });

    this.taskContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-task')) {
        const { index } = event.target.parentElement.parentElement.dataset;
        this.deleteTask(index);
      }
    });

    this.taskContainer.addEventListener('input', (event) => {
      if (event.target.classList.contains('description')) {
        const { index } = event.target.parentElement.parentElement.dataset;
        const newDescription = event.target.textContent;
        this.editTask(index, newDescription);
      }
    });

    this.taskContainer.addEventListener('change', (event) => {
      if (event.target.classList.contains('checkbox')) {
        const { index } = event.target.parentElement.parentElement.dataset;
        this.toggleCompleted(index);
      }
    });

    this.clearButton.addEventListener('click', () => {
      this.tasksArray = this.tasksArray.filter((task) => !task.completed);
      this.reindexTasks();
      this.displayAllTasks();
      this.updateLocalStorage();
    });
  }

  addTask(des) {
    const newTask = {
      description: des,
      index: this.tasksArray.length + 1,
      completed: false,
    };
    this.tasksArray.push(newTask);
    this.displayTasks(newTask);
    this.updateLocalStorage();
  }

  deleteTask(index) {
    this.tasksArray.splice(index - 1, 1);
    this.reindexTasks();
    this.displayAllTasks();
    this.updateLocalStorage();
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
