const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// 📌 [GET] Fetch all assignments
router.get("/", async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (error) {
        console.error("Error fetching assignments:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// 📌 [POST] Create an assignment with error handling
router.post("/", async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        // Validate input
        if (!title || !dueDate) {
            return res.status(400).json({ error: "Title and Due Date are required" });
        }

        const newAssignment = new Assignment({ title, description, dueDate });
        await newAssignment.save();

        res.status(201).json(newAssignment);
    } catch (error) {
        console.error("Error adding assignment:", error);
        res.status(500).json({ error: "Failed to add assignment" });
    }
});

// 📌 [DELETE] Remove an assignment with error handling
router.delete("/:id", async (req, res) => {
    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!deletedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        res.json({ message: "Assignment deleted" });
    } catch (error) {
        console.error("Error deleting assignment:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// 📌 [PUT] Update an existing assignment with error handling
router.put("/:id", async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate },
            { new: true, runValidators: true } // Returns updated object
        );

        if (!updatedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.json(updatedAssignment);
    } catch (error) {
        console.error("Error updating assignment:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
