// Select elements
const addTaskForm = document.getElementById("addTaskForm");
const projectNameInput = document.getElementById("projectName");
const taskNameInput = document.getElementById("taskName");
const taskStatusSelect = document.getElementById("taskStatus");
const tasksTable = document.getElementById("tasksTable").querySelector("tbody");

// Initialize tasks array
let tasks = [];

// Function to render tasks
function renderTasks() {
  tasksTable.innerHTML = ""; // Clear the table body
  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    // Project Name Column
    const projectCell = document.createElement("td");
    projectCell.textContent = task.project;
    row.appendChild(projectCell);

    // Task Name Column
    const nameCell = document.createElement("td");
    nameCell.textContent = task.name;
    row.appendChild(nameCell);

    // Task Status Column
    const statusCell = document.createElement("td");
    statusCell.textContent = task.status;
    statusCell.className = task.status.toLowerCase().replace(" ", "-");
    row.appendChild(statusCell);

    // Actions Column
    const actionsCell = document.createElement("td");

    // Dropdown for updating status
    const statusDropdown = document.createElement("select");
    ["Pending", "InProgress", "Completed"].forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      option.selected = task.status === status;
      statusDropdown.appendChild(option);
    });
    statusDropdown.addEventListener("change", (e) =>
      updateTaskStatus(index, e.target.value)
    );
    actionsCell.appendChild(statusDropdown);

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.background = "#e74c3c";
    deleteButton.style.color = "white";
    deleteButton.addEventListener("click", () => deleteTask(index));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    tasksTable.appendChild(row);
  });

  // Save updated tasks to localStorage
  saveTasksToLocalStorage();
}

// Function to add a task
function addTask(project, name, status) {
  if (
    tasks.some(
      (task) =>
        task.name.toLowerCase() === name.toLowerCase() &&
        task.project.toLowerCase() === project.toLowerCase()
    )
  ) {
    alert("Task with this name already exists in the project!");
    return;
  }
  tasks.push({ project, name, status });
  renderTasks();
}

// Function to update task status
function updateTaskStatus(index, newStatus) {
  tasks[index].status = newStatus;
  saveTasksToLocalStorage();
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Function to filter tasks by status
function filterTasks(status) {
  tasksTable.innerHTML = ""; // Clear the table body
  tasks.forEach((task, index) => {
    if (task.status === status) {
      const row = document.createElement("tr");

      // Project Name Column
      const projectCell = document.createElement("td");
      projectCell.textContent = task.project;
      row.appendChild(projectCell);

      // Task Name Column
      const nameCell = document.createElement("td");
      nameCell.textContent = task.name;
      row.appendChild(nameCell);

      // Task Status Column
      const statusCell = document.createElement("td");
      statusCell.textContent = task.status;
      row.appendChild(statusCell);

      // Actions Column
      const actionsCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(index));
      actionsCell.appendChild(deleteButton);

      row.appendChild(actionsCell);
      tasksTable.appendChild(row);
    }
  });
}

// Add task form submit handler
addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const project = projectNameInput.value.trim();
  const name = taskNameInput.value.trim();
  const status = taskStatusSelect.value;
  if (project && name) {
    addTask(project, name, status);
    addTaskForm.reset();
  }
});

// Initial load
loadTasksFromLocalStorage();
