const BASE_URL = "http://localhost:5000/api/assignments";

// Fetch all assignments
async function getAssignments() {
    const response = await fetch(BASE_URL);
    return response.json();
}

// Create a new assignment
async function createAssignment(assignment) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignment),
    });
    return response.json();
}

// Update an assignment
async function updateAssignment(id, updatedData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    return response.json();
}

// Delete an assignment
async function deleteAssignment(id) {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return response.json();
}
