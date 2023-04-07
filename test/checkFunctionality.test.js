/**
 * @jest-environment jsdom
 */
import {
  tasksArray,
  updateLocalStorage,
  displayAllTasks,
} from '../src/modules/task.js';
import editTask from '../src/modules/editTask.js';
import toggleCompleted from '../src/modules/toggleCompleted.js';
import clearCompleted, { filteredArray } from '../src/modules/clearCompleted.js';

jest.mock('../src/modules/task.js', () => ({
  updateLocalStorage: jest.fn(),
  reindexTasks: jest.fn(),
  displayAllTasks: jest.fn(),
  tasksArray: [
    {
      description: 'This should change',
      index: 1,
      completed: false,
    }, {
      description: 'Second task',
      index: 2,
      completed: false,
    }, {
      description: 'Second task',
      index: 2,
      completed: false,
    },
  ],
}));

describe('Check functionality', () => {
  test('This changes the description', () => {
    // Arrange
    const index = 1;
    const newDescription = 'editTask works!';

    // Act
    editTask(index, newDescription);

    // Assert
    expect(tasksArray[0].description).toBe('editTask works!');
    expect(updateLocalStorage).toHaveBeenCalled();
  });

  test('This toggles the completed property', () => {
    // Arrange
    const index = 2;
    // Act
    toggleCompleted(index);

    // Assert
    expect(tasksArray[1].completed).toBe(true);
    expect(updateLocalStorage).toHaveBeenCalled();
    expect(displayAllTasks).toHaveBeenCalled();
  });

  test('This should remove all completed tasks', () => {
    // Act
    clearCompleted();

    // Assert
    expect(filteredArray.length).toBe(2);
  });
});
