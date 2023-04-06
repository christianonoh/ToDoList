/**
 * @jest-environment jsdom
 */

import { addTask } from "../src/modifyTask";

jest.mock('../__mock__/testlist');
// jest.mock('../src/modifyTask', () => ({
//     displayTasks: jest.fn(),
//     updateLocalStorage: jest.fn(),
//   }));
  
  describe('addTask', () => {

    test('adds a new task to the tasksArray', () => {
      // Arrange
      const des = 'Buy groceries';
      const listArr = JSON.parse(localStorage.getItem('listArr'));
      // Act
      addTask("des");
  
      // Assert
      const newListArr = JSON.parse(localStorage.getItem('listArr'));
      expect(newListArr.length).toBe(listArr.length + 1);
      expect(listArr[1].description).toBe("des");
    });
  
    test('calls displayTasks and updateLocalStorage with the new task', () => {
      // Arrange
      const des = 'Clean the house';
  
      // Act
      addTask(des);
  
      // Assert
      expect(displayTasks).toHaveBeenCalledWith({
        description: des,
        index: 1,
        completed: false,
      });
      expect(updateLocalStorage).toHaveBeenCalled();
    });
  });