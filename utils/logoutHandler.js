import { logout } from "../api/user.js";
import { errorHandler } from "./errorHandler.js";
import { createModalHtml } from "./htmlTemplates.js";
import { removeElementAfterAnimationPromise } from "./utils.js";

export function onLogoutButtonClick() {
  const modalHTml = createModalHtml({
    title: `R U sure, U wanna logout?`,
    submitButtonText: "Logout",
  });

  document.body.insertAdjacentHTML("beforeend", modalHTml);

  const modalContainer = document.querySelector("[data-modal-container]");
  const closeModalButton = document.querySelector("[data-close-modal-button]");
  const submitCloseModalButton = document.querySelector(
    "[data-submit-modal-button]",
  );

  const closeModal = () => {
    modalContainer.classList.add("smoothClose");

    return removeElementAfterAnimationPromise(modalContainer, () => {
      modalContainer.removeEventListener("click", onModalContainerClick);
      closeModalButton.removeEventListener("click", closeModal);
      submitCloseModalButton.removeEventListener(
        "click",
        onSubmitModalButtonClick,
      );
    });
  };

  const onModalContainerClick = (event) => {
    if (event.target.dataset.hasOwnProperty("modalContainer")) {
      closeModal();
    }
  };

  const onSubmitModalButtonClick = async () => {
    try {
      await logout();

      await closeModal();

      window.location.href = "../auth/login.html";
    } catch (error) {
      errorHandler(error);
    }
  };

  modalContainer.addEventListener("click", onModalContainerClick);
  closeModalButton.addEventListener("click", closeModal);
  submitCloseModalButton.addEventListener("click", onSubmitModalButtonClick);
}
