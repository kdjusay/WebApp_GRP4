const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);

assignmentSchema.set("toJSON", {
    transform: (doc, ret) => {
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    }
  });
  

