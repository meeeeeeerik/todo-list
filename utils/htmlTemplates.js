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
        class="smoothOpen bg-opacity backdrop-blur-sm bg-black fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center" id="taskModalContainer"
      >
        <form id="taskModal" class="w-full max-w-md bg-white p-8 rounded-lg max-h-full">
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
            <button type="button" class="button button-gray" id="closeTaskModalButton">Отменить</button>
            <button id="submitTaskModalFormButton" class="button button-green">${submitButtonText}</button>
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
    <div class="task ${isNew ? "openTask" : ""}">
      <label class="checkboxWrapper">
        <input type="checkbox" />
        <div class="checkbox 
        ${classByPriority[task.priority]}"></div>
      </label>
      <div class="ml-2 cursor-pointer hover:opacity-70 w-3/4">
        <div class="mb-1 line-clamp-1">${task.title}</div>
        <div class="text-sm text-zinc-500 line-clamp-3">
          ${task.description}
        </div>
      </div>
    </div>
  `;
}
