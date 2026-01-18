import { getUser } from "./api/user.js";

async function start() {
  try {
    const user = await getUser();

    if (!user) {
      window.location.href = "./auth/login.html";
    }
  } catch (error) {
    console.log("error", error);
  }
}

start();
