import { getUser } from "./api/user.js";
import { openTaskModal } from "./utils/taskModalHandlers.js";

async function start() {
  try {
    const user = await getUser();

    if (!user) {
      window.location.href = "./auth/login.html";
    }

    const addTaskButton = document.querySelector("#addTaskButton");

    addTaskButton.addEventListener("click", openTaskModal);
  } catch (error) {
    console.log("error", error);
  }
}

start();
