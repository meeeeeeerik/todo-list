import { createTaskHTml } from "./htmlTemplates.js";

export function renderNewTask(task) {
  const tasksContainer = document.querySelector("#tasksContainer");

  tasksContainer.insertAdjacentHTML("beforeend", createTaskHTml(task));
}
