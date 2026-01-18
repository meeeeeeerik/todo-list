import { register } from "../api/user";

async function onSubmit(event) {
  event.preventDefault();

  const elements = event.target.elements;

  const email = elements.email;
  const emailValue = elements.email.value;

  const password = elements.password;
  const passwordValue = elements.password.value;

  const confirmPassword = elements.confirmPassword;
  const confirmPasswordValue = elements.confirmPassword.value;

  const registrationButton = elements.registrationButton;

  try {
    const checkAndRemoveError = () => {
      if (confirmPassword.classList.contains("error")) {
        confirmPassword.classList.remove("error");
      }
    };

    confirmPassword.removeEventListener("input", checkAndRemoveError);

    if (passwordValue !== confirmPasswordValue) {
      confirmPassword.addEventListener("input", checkAndRemoveError);

      confirmPassword.classList.add("error");
      throw Error("Passwords do not match!");
    }

    email.setAttribute("disabled", "true");
    password.setAttribute("disabled", "true");
    confirmPassword.setAttribute("disabled", "true");
    registrationButton.setAttribute("disabled", "true");

    await register(emailValue, passwordValue);

    const registrationContentContainer = document.querySelector(
      "#registrationContentContainer"
    );

    registrationContentContainer.innerHTML = `
      <div class="text-center font-semibold">
        Письмо с подтверждением отправлено на почту
      </div> 
    `;
  } catch (error) {
    email.removeAttribute("disabled", "true");
    password.removeAttribute("disabled", "true");
    confirmPassword.removeAttribute("disabled", "true");
    registrationButton.removeAttribute("disabled", "true");

    console.log("error", error);
  }
}

async function start() {
  try {
    const registrationForm = document.querySelector("#registrationForm");

    registrationForm.addEventListener("submit", onSubmit);
  } catch (error) {
    console.log("error", error);
  }
}

start();
