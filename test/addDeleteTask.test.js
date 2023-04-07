/**
 * @jest-environment jsdom
 */
import addTask from '../src/modules/addTask.js';
import deleteTask from '../src/modules/deleteTask.js';
import {
  displayTasks, updateLocalStorage, tasksArray, reindexTasks, displayAllTasks,
} from '../src/modules/task.js';

jest.mock('../src/modules/task.js', () => ({
  displayTasks: jest.fn(),
  updateLocalStorage: jest.fn(),
  reindexTasks: jest.fn(),
  displayAllTasks: jest.fn(),
  tasksArray: [],
}));

describe('addTask', () => {
  test('adds a new task to the tasksArray', () => {
    // Arrange
    document.body.innerHTML = '<div class="input-task">'
      + '<input maxlength="100" id="task-description" required type="text" placeholder="Input your tasks...">'
      + '<button id="submit-button" class="submit-button"></button>'
      + '</div>';

    // Act
    addTask('Buy groceries');

    /* Assert */
    expect(tasksArray.length).toBe(1); // check that the tasksArray has been modified correctly
    expect(displayTasks).toHaveBeenCalledWith({ description: 'Buy groceries', index: 1, completed: false }); // check that displayTasks has been called with the correct argument
    expect(updateLocalStorage).toHaveBeenCalled(); // check that updateLocalStorage has been called
  });

  test('deletes a task from tasksArray', () => {
    // Act
    deleteTask(1);

    // Assert
    expect(tasksArray.length).toBe(0);
    expect(reindexTasks).toHaveBeenCalled();
    expect(displayAllTasks).toHaveBeenCalled();
  });
});
