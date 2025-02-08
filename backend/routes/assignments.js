const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// 📌 [GET] Fetch all assignments
router.get("/", async (req, res) => {
    try {
      const assignments = await Assignment.find();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

// 📌 [POST] Create an assignment
router.post("/", async (req, res) => {
    const { title, description, dueDate } = req.body;
    const newAssignment = new Assignment({ title, description, dueDate });
    await newAssignment.save();
    res.json(newAssignment);
});

// 📌 [DELETE] Remove an assignment
router.delete("/:id", async (req, res) => {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
});

// 📌 [PUT] Update an existing assignment
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
        res.status(500).json({ message: "Server Error", error });
    }
});


module.exports = router;
