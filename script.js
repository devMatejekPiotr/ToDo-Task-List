{
  let tasks = [];
  let isTaskDone = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask();
  };

  const addNewTask = (newTask) => {
    tasks = [...tasks, newTask];
    render();
  };

  const resetInputField = (inputEl) => {
    inputEl.focus();
    inputEl.value = null;
  };

  validateInputValue = (inputValue, inputEl) => {
    if (!inputValue) {
      resetInputField(inputEl);
      return false;
    }
    return true;
  };

  const createTask = () => {
    const inputTask = document.querySelector(".js-newTask");
    const inputTaskValue = inputTask.value.trim();
    if (!validateInputValue(inputTaskValue, inputTask)) return;

    const newTask = {
      content: inputTaskValue,
      done: false,
    };

    addNewTask(newTask);
    resetInputField(inputTask);
  };

  const removeTask = (indexBtn) => {
    tasks = tasks.filter((item, index) => indexBtn !== index);
    render();
  };

  const toggleTaskDone = (indexBtn) => {
    tasks = tasks.map((task, index) =>
      indexBtn === index ? { ...task, done: !task.done } : task
    );
    render();
  };

  const bindEvents = () => {
    const doneTasksBtns = document.querySelectorAll(".js-doneBtn");
    const removeTasksBtns = document.querySelectorAll(".js-removeBtn");

    doneTasksBtns.forEach((doneBtn, index) => {
      doneBtn.addEventListener("click", () => toggleTaskDone(index));
    });

    removeTasksBtns.forEach((removeBtn, index) => {
      removeBtn.addEventListener("click", () => removeTask(index));
    });
  };

  const renderTask = () => {
    let tasksContent = "";

    tasksContent = tasks
      .map((task) => {
        return `
            <li class="list__item ${
              isTaskDone && task.done ? "list__item--hidden" : ""
            }">
                <button class="list__button list__button--checked js-doneBtn">${
                  task.done ? "✔" : ""
                }</button>
                    <span class="list__paragrapf ${
                      task.done && "list__paragraph--done"
                    }">${task.content}</span>
                <button class="list__button list__button--remove js-removeBtn">🗑</button>
            </li>
            `;
      })
      .join("");

    const taskContainer = document.querySelector(".js-task");
    taskContainer.innerHTML = tasksContent;
  };

  const chechedIsAllTaskDone = () => {
    const isAllTasksDone = tasks.every((task) => task.done === true);
    const disabledAttr = isAllTasksDone ? "disabled" : "";
    const disabledClass = isAllTasksDone ? "section__button--disabled" : "";

    return {
      disabledAttr,
      disabledClass,
    };
  };

  const renderButtons = () => {
    const buttonState = chechedIsAllTaskDone();
    const { disabledAttr, disabledClass } = buttonState;

    const buttonsEvents = `
      <button class="section__button section__button--display js-hideTasksBtn">${
        !isTaskDone ? "ukryj ukończone" : "pokaż ukończone"
      }</button>
      <button class="section__button section__button--display ${disabledClass} js-finishTasksBtn "${disabledAttr}>ukończ wszystkie</button>
      `;
    const buttonContainer = document.querySelector(
      ".section__containerButtons"
    );
    buttonContainer.innerHTML = buttonsEvents;

    if (tasks.length !== 0) {
      document
        .querySelector(".js-hideTasksBtn")
        .classList.remove("section__button--display");

      document
        .querySelector(".js-finishTasksBtn")
        .classList.remove("section__button--display");
    }
  };

  const hideDoneTasks = () => {
    isTaskDone = !isTaskDone;
    render();
  };

  const finishAllTasks = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const bindButtonEvents = () => {
    const hideTasksBtn = document.querySelector(".js-hideTasksBtn");
    const finishTasksBtn = document.querySelector(".js-finishTasksBtn");
    hideTasksBtn.addEventListener("click", hideDoneTasks);
    finishTasksBtn.addEventListener("click", finishAllTasks);
  };

  const render = () => {
    renderTask();
    renderButtons();
    bindEvents();
    bindButtonEvents();
  };

  const init = () => {
    render();

    const form = document.querySelector(".form");
    form.addEventListener("submit", handleSubmit);
  };

  init();
}
