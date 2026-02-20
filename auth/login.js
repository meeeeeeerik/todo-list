import { login } from "../api/user";
import { errorHandler } from "../utils/errorHandler";

async function onSubmit(event) {
  event.preventDefault();

  const elements = event.target.elements;

  const email = elements.email;
  const emailValue = elements.email.value;

  const password = elements.password;
  const passwordValue = elements.password.value;

  const loginButton = elements.loginButton;

  try {
    email.setAttribute("disabled", "true");
    password.setAttribute("disabled", "true");
    loginButton.setAttribute("disabled", "true");

    await login(emailValue, passwordValue);

    window.location.href = "./";
  } catch (error) {
    email.removeAttribute("disabled", "true");
    password.removeAttribute("disabled", "true");
    loginButton.removeAttribute("disabled", "true");

    errorHandler(error);
  }
}

async function start() {
  try {
    const loginForm = document.querySelector("#loginForm");

    loginForm.addEventListener("submit", onSubmit);
  } catch (error) {
    errorHandler(error);
  }
}

start();
