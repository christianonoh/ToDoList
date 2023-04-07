/**
 * @jest-environment jsdom
 */

const listArr = [
  {
    description: "test",
    index: 1,
    completed: false,
  },
];

// import { addTask } from "../src/modifyTask";
jest.mock("../__mock__/testlist");
jest.mock("../src/task");
jest.mock("../src/modifyTask");

describe("addTask", () => {
  test("adds a new task to the tasksArray", () => {
    // Arrange
    document.body.innerHTML =
      '<div class="input-task">' +
      '<input maxlength="100" id="task-description" required type="text" placeholder="Input your tasks...">' +
      '<button id="submit-button" class="submit-button"></button>' +
      "</div>";
    const list = JSON.parse(localStorage.getItem("list")) || [];
    // Act
    addTask('Buy groceries');
    const newList = JSON.parse(localStorage.getItem("list"));
    const newListLength = newList.length;

    /* Assert */
    expect(newListLength).toBe(list.length + 1);
    expect(newList[newListLength - 1].description).toBe("newTask");
  });
});
