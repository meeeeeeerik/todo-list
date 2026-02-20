import { createErrorContainerHtml, createErrorHtml } from "./htmlTemplates.js";
import { removeElementAfterAnimationPromise } from "./utils.js";

export function errorHandler(error) {
  const errorContainer = document.querySelector("[data-error-container]");

  if (errorContainer) {
    const errorHtml = createErrorHtml(error?.message || "Something happened");

    errorContainer.insertAdjacentHTML("beforeend", errorHtml);

    const errorsElement = document.querySelectorAll("[data-error]");

    const errorElement = errorsElement[errorsElement.length - 1];

    removeErrorAfterTimeout(errorElement);
  } else {
    const errorContainerHtml = createErrorContainerHtml(
      error?.message || "Something happened",
    );

    document.body.insertAdjacentHTML("beforeend", errorContainerHtml);

    const errorElement = document.querySelector("[data-error]");

    removeErrorAfterTimeout(errorElement);
  }

  document
    .querySelector("[data-error-container]")
    .addEventListener("click", (event) => {
      const closeErrorButton = event.target.closest(
        "[data-close-error-button]",
      );

      const errorElement = event.target.closest("[data-error]");

      if (closeErrorButton && errorElement) {
        removeError(errorElement);
      }
    });
}

function removeErrorAfterTimeout(errorElement) {
  setTimeout(async () => {
    removeError(errorElement);
  }, 3000);
}

async function removeError(errorElement) {
  errorElement.classList.add("closeError");

  await removeElementAfterAnimationPromise(errorElement);

  const errorsElement = document.querySelectorAll("[data-error]");

  if (!errorsElement.length) {
    document.querySelector("[data-error-container]").remove();
  }
}
