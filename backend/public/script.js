const API_URL = window.location.origin.includes("localhost")
  ? "http://localhost:5000/tasks"
  : "/tasks"; // Auto-switch for local & deployed

document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();

  if (!title) {
    alert("Task title is required!");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) throw new Error("Failed to add task");

    document.getElementById("task-form").reset();
    loadTasks();
  } catch (error) {
    console.error("❌ Error:", error.message);
    alert("Error adding task!");
  }
});

async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to load tasks");

    const tasks = await response.json();
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = `<p class="text-gray-500 text-center">No tasks available.</p>`;
      return;
    }

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow";

      li.innerHTML = `
        <span class="font-medium">${task.title}</span>
        <button onclick="deleteTask('${task._id}')" class="bg-red-500 text-white px-3 py-1 rounded">
          Delete
        </button>
      `;

      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    alert("Error loading tasks!");
  }
}

async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete task");

    loadTasks();
  } catch (error) {
    console.error("❌ Error:", error.message);
    alert("Error deleting task!");
  }
}
