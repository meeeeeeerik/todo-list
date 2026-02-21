import { getActiveTasks, getArchiveTasks } from "./api/task.js";
import { getUser } from "./api/user.js";
import { errorHandler } from "./utils/errorHandler.js";
import { onLogoutButtonClick } from "./utils/logoutHandler.js";
import {
  makeTextIfErrorInContainer,
  renderActiveTasks,
  renderActiveTasksLoader,
  renderArchiveTasks,
  renderArchiveTasksLoader,
  renderUser,
} from "./utils/renders.js";
import { openTaskModal } from "./utils/taskModalHandlers.js";
import {
  onActiveTasksContainerClick,
  onArchiveTasksContainerClick,
} from "./utils/tasksContainerHandlers.js";

function removeUserLoader() {
  const loader = document.querySelector("#loader");

  if (loader) {
    loader.remove();
  }
}

async function getAndRenderActiveTasks() {
  try {
    renderActiveTasksLoader();

    const activeTasks = await getActiveTasks();

    renderActiveTasks(activeTasks);
  } catch (error) {
    makeTextIfErrorInContainer(document.querySelector("#tasks-container"));

    errorHandler(error);
  }
}

async function getAndRenderArchiveTasks() {
  try {
    renderArchiveTasksLoader();

    const archiveTasks = await getArchiveTasks();

    renderArchiveTasks(archiveTasks);
  } catch (error) {
    makeTextIfErrorInContainer(
      document.querySelector("#archive-tasks-container"),
    );

    errorHandler(error);
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

    await Promise.all([getAndRenderActiveTasks(), getAndRenderArchiveTasks()]);

    const logoutButton = document.querySelector("#logout-button");
    const addTaskButton = document.querySelector("#add-task-button");
    const activeTasksContainer = document.querySelector("#tasks-container");
    const archiveTasksContainer = document.querySelector(
      "#archive-tasks-container",
    );

    logoutButton.addEventListener("click", () => {
      onLogoutButtonClick();
    });
    addTaskButton.addEventListener("click", () => openTaskModal());
    activeTasksContainer.addEventListener("click", onActiveTasksContainerClick);
    archiveTasksContainer.addEventListener(
      "click",
      onArchiveTasksContainerClick,
    );
  } catch (error) {
    errorHandler(error);
  }
}

start();
