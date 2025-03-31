app.get("/validate", (req, res, next) => {
    const { name } = req.query;
    if (!name) {
      const error = new Error("Name parameter is required");
      error.status = 400; // Assign status code
      next(error); // Pass error to middleware
    } else {
      res.send(`Hello, ${name}!`);
    }
  });
  