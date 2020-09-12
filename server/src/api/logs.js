const { Router } = require("express");

const router = Router();

const LogEntry = require("../models/LogEntry.js");

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();

    res.json(entries);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const entry = await logEntry.save();
    res.json(entry);
  } catch (error) {
    next(error);
    if (error.name === "ValidationError") {
      res.statusCode = 422;
    }
  }
  // console.log(req.body);
});

module.exports = router;
