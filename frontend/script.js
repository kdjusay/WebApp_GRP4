const API_URL = "http://localhost:5000/api/assignments";

document.addEventListener("DOMContentLoaded", () => {
    loadAssignments();
    document.getElementById("assignmentForm").addEventListener("submit", addAssignment);
});

// Load assignments and display them
async function loadAssignments() {
    try {
        const assignments = await getAssignments();
        const list = document.getElementById("assignmentsList");
        list.innerHTML = "";

        if (assignments.length === 0) {
            list.innerHTML = "<p>No assignments found.</p>";
            return;
        }

        assignments.forEach((assignment) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${assignment.title}</strong> - ${assignment.description} (Due: ${assignment.dueDate})
                <button onclick="editAssignment('${assignment._id}')">Edit</button>
                <button onclick="removeAssignment('${assignment._id}')">Delete</button>
            `;
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading assignments:", error);
    }
}

// Add assignment
async function addAssignment(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("dueDate").value;

    if (!title || !description || !dueDate) {
        alert("All fields are required.");
        return;
    }

    try {
        await createAssignment({ title, description, dueDate });
        alert("Assignment added successfully!");
        document.getElementById("assignmentForm").reset();
        loadAssignments();
    } catch (error) {
        console.error("Error adding assignment:", error);
        alert("Failed to add assignment.");
    }
}

// Edit an assignment (update functionality)
async function editAssignment(id) {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");
    const newDueDate = prompt("Enter new due date (YYYY-MM-DD):");

    if (!newTitle || !newDescription || !newDueDate) {
        alert("All fields are required.");
        return;
    }

    try {
        await updateAssignment(id, { title: newTitle, description: newDescription, dueDate: newDueDate });
        alert("Assignment updated successfully!");
        loadAssignments();
    } catch (error) {
        console.error("Error updating assignment:", error);
        alert("Failed to update assignment.");
    }
}

// Delete an assignment
async function removeAssignment(id) {
    if (!confirm("Are you sure you want to delete this assignment?")) return;

    try {
        await deleteAssignment(id);
        alert("Assignment deleted successfully!");
        loadAssignments();
    } catch (error) {
        console.error("Error deleting assignment:", error);
        alert("Failed to delete assignment.");
    }
}

// Fetch assignments from the backend
async function getAssignments() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch assignments");
        return await response.json();
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return [];
    }
}

// Create a new assignment
async function createAssignment(assignment) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(assignment),
        });

        if (!response.ok) throw new Error("Failed to create assignment");
        return await response.json();
    } catch (error) {
        console.error("Error creating assignment:", error);
    }
}

// Update an existing assignment
async function updateAssignment(id, updatedData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) throw new Error("Failed to update assignment");
        return await response.json();
    } catch (error) {
        console.error("Error updating assignment:", error);
    }
}

// Delete an assignment
async function deleteAssignment(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete assignment");
    } catch (error) {
        console.error("Error deleting assignment:", error);
    }
}
