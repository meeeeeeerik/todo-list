import { modes, priorities } from "./constants.js";

export function createTaskModalHtml(mode = modes.create) {
  let title = "Новая Задача";
  let submitButtonText = "Create";

  if (mode === modes.edit) {
    title = "Edit Task";
    submitButtonText = "Save";
  }

  return `
    <div
        class="smoothOpen bg-opacity backdrop-blur-sm bg-black fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center" id="task-modal-container"
      >
        <form id="task-modal" class="w-full max-w-md bg-white p-8 rounded-lg max-h-full relative">
          ${
            mode === modes.edit
              ? `
          <div class="absolute top-0 right-0 bottom-0 left-0 bg-white flex justify-center items-center rounded-lg" id="task-loader">
            <div class="custom-loader"></div>
          </div>
          `
              : ""
          }
          <h2 class="text-lg font-bold text-blue-600 border-b-2 pb-2 mb-4">
            ${title}
          </h2>
          <label class="block mb-1" for="title">Название</label>
          <input
            id="title"
            type="text"
            class="w-full h-10 rounded-lg px-4 border mb-2"
            required
          />
          <label class="block mb-1" for="description">Описание</label>
          <textarea
            id="description"
            class="w-full h-32 rounded-lg py-2 px-4 border max-h-56 mb-2"
          ></textarea>
          <label class="block mb-1" for="priority">Приоритет</label>
          <select id="priority" class="w-full h-10 rounded-lg px-4 border mb-6">
            <option value="${priorities.high}">Высокий</option>
            <option value="${priorities.medium}">Средний</option>
            <option value="${priorities.low}">Низкий</option>
            <option value="${priorities.empty}" selected>Без приоритета</option>
          </select>
          <div class="flex justify-between">
            <button type="button" class="button button-gray" id="close-task-modal-button">Отменить</button>
            <button id="submit-task-modal-form-button" class="button button-green">${submitButtonText}</button>
          </div>
        </form>
      </div> 
  `;
}

export function createTaskHtml(task, isNew = false) {
  const classByPriority = {
    [priorities.high]: "red",
    [priorities.medium]: "yellow",
    [priorities.low]: "blue",
    [priorities.empty]: "",
  };

  return `
    <div class="task ${isNew ? "openTask" : ""}" data-task-container-id="${task.id}">
      <label class="checkboxWrapper" data-task-id="${task.id}" data-task-checkbox>
        <input type="checkbox" />
        <div class="checkbox 
        ${classByPriority[task.priority]}"></div>
      </label>
      <div class="ml-2 cursor-pointer hover:opacity-70 w-3/4" data-task-id="${task.id}" data-task-content>
        <div class="mb-1 line-clamp-1">${task.title}</div>
        <div class="text-sm text-zinc-500 line-clamp-3">
          ${task.description}
        </div>
      </div>
    </div>
  `;
}

export function createArchiveTaskHtml(archiveTask, isNew = false) {
  const checkboxClassByPriority = {
    [priorities.high]: "red",
    [priorities.medium]: "yellow",
    [priorities.low]: "blue",
    [priorities.empty]: "",
  };

  const contentClassByPriority = {
    [priorities.high]: "decoration-red-700",
    [priorities.medium]: "decoration-yellow-600",
    [priorities.low]: "decoration-blue-600",
    [priorities.empty]: "decoration-black",
  };

  return `
    <div class="task ${isNew ? "openTask" : ""}" data-archive-task-container-id="${archiveTask.id}">
      <label class="checkboxWrapper" data-archive-task-id="${archiveTask.id}" data-task-checkbox>
        <input type="checkbox" checked />
        <div class="checkbox 
        ${checkboxClassByPriority[archiveTask.priority]}"></div>
      </label>
      <div class="ml-2 w-3/4">
        <div class="mb-1 line-clamp-1 line-through ${contentClassByPriority[archiveTask.priority]}">${archiveTask.title}</div>
        <div class="text-sm text-zinc-500 line-clamp-3 ${contentClassByPriority[archiveTask.priority]}">
          ${archiveTask.description}
        </div>
      </div>
      <div class="ml-auto flex items-center">
        <button class="button button-red" data-delete-task-button data-task-title="${archiveTask.title}">Удалить</button>
      </div>
    </div>
  `;
}

export function createModalHtml({ title, submitButtonText }) {
  return `
    <div class="smoothOpen bg-opacity backdrop-blur-sm bg-black fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center" data-modal-container>
      <div class="w-full max-w-md bg-white p-8 rounded-lg max-h-full">
        <h2 class="text-lg font-bold text-center mb-6">
          ${title}
        </h2>
        <div class="flex justify-between">
          <button class="button button-gray" data-close-modal-button>Отменить</button>
          <button class="button button-red" data-submit-modal-button>${submitButtonText}</button>
        </div>
      </div>
    </div>
  `;
}
