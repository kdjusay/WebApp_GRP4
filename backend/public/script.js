const API_URL = window.location.origin.includes("localhost")
  ? "http://localhost:5000/assignments"
  : "/assignments"; // Auto-switch for local & deployed

// Check if user is logged in
document.addEventListener("DOMContentLoaded", function () {
  const userToken = localStorage.getItem("token");
  if (!userToken) {
    window.location.href = "login.html"; // Redirect to login page if not logged in
  } else {
    loadAssignments();
  }
});

// Handle assignment submission
document.getElementById("assignment-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("assignment-title").value.trim();
  const description = document.getElementById("assignment-desc").value.trim();
  const dueDate = document.getElementById("due-date").value;

  if (!title || !dueDate) {
    alert("Title and Due Date are required!");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ title, description, dueDate }),
    });

    if (!response.ok) throw new Error("Failed to add assignment");

    document.getElementById("assignment-form").reset();
    loadAssignments();
  } catch (error) {
    console.error("❌ Error:", error.message);
    alert("Error adding assignment!");
  }
});

// Load assignments from API
async function loadAssignments() {
  document.getElementById("loading").classList.remove("hidden"); // Show loading indicator

  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) throw new Error("Failed to load assignments");

    const assignments = await response.json();
    const assignmentList = document.getElementById("assignment-list");
    assignmentList.innerHTML = "";

    if (assignments.length === 0) {
      assignmentList.innerHTML = `<p class="text-gray-500 text-center">No assignments available.</p>`;
      return;
    }

    assignments.forEach((assignment) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow";

      li.innerHTML = `
        <div>
          <span class="font-medium">${assignment.title}</span>
          <p class="text-sm text-gray-600">Due: ${assignment.dueDate}</p>
        </div>
        <button onclick="deleteAssignment('${assignment._id}')" class="bg-red-500 text-white px-3 py-1 rounded">
          Delete
        </button>
      `;

      assignmentList.appendChild(li);
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    alert("Error loading assignments!");
  } finally {
    document.getElementById("loading").classList.add("hidden"); // Hide loading indicator
  }
}

// Delete assignment
async function deleteAssignment(id) {
  if (!confirm("Are you sure you want to delete this assignment?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) throw new Error("Failed to delete assignment");

    loadAssignments();
  } catch (error) {
    console.error("❌ Error:", error.message);
    alert("Error deleting assignment!");
  }
}
