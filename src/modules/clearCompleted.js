/* eslint-disable import/no-cycle */
/* eslint-disable import/no-mutable-exports */
import { tasksArray } from './task.js';

export let filteredArray;
export default function clearCompleted() {
  filteredArray = tasksArray.filter((task) => !task.completed);
  return filteredArray;
}
