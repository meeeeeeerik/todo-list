import { getTask } from "../api/task.js";
import { modes } from "./constants.js";
import { openTaskModal } from "./taskModalHandlers.js";

export async function onTasksContainerClick(event) {
  const taskCheckbox = event.target.closest("[data-taskCheckbox]");
  const taskContent = event.target.closest("[data-taskContent]");

  if (taskCheckbox && event.target.tagName !== "INPUT") {
    console.log("task checkbox");
  }

  if (taskContent) {
    const taskId = taskContent.dataset.taskid;

    openTaskModal(modes.edit, taskId);

    const task = await getTask(taskId);

    const taskModal = document.querySelector("#taskModal");
    const taskLoader = document.querySelector("#taskLoader");

    if (taskModal && taskLoader) {
      const elements = taskModal.elements;

      elements.title.value = task.title;
      elements.description.value = task.description;
      elements.priority.value = task.priority;

      taskLoader.remove();
    }
  }
}
