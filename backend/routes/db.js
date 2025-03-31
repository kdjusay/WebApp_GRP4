app.get("/db", async (req, res, next) => {
    try {
      throw new Error("Database connection failed");
    } catch (err) {
      err.status = 500;
      next(err);
    }
  });
  