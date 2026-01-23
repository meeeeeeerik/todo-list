import { getTasks } from "./api/task.js";
import { getUser } from "./api/user.js";
import { renderTasks, renderTasksLoader, renderUser } from "./utils/renders.js";
import { openTaskModal } from "./utils/taskModalHandlers.js";

function removeUserLoader() {
  const loader = document.querySelector("#loader");

  if (loader) {
    loader.remove();
  }
}

async function start() {
  try {
    const user = await getUser();

    if (!user) {
      window.location.href = "./auth/login.html";
    }

    renderUser(user);

    removeUserLoader();

    renderTasksLoader();

    const tasks = await getTasks();

    renderTasks(tasks);

    const addTaskButton = document.querySelector("#addTaskButton");

    addTaskButton.addEventListener("click", openTaskModal);
  } catch (error) {
    console.log("error", error);
  }
}

start();
