const API_URL = 'http://localhost:5000/tasks'; // Update this if backend is deployed

document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    if (response.ok) {
        document.getElementById("task-form").reset();
        loadTasks();
    }
});

async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";
        li.innerHTML = `
            <span>${task.title}</span>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTasks();
}
