import express from "express";

const router = express.Router();

router.post("/messages", (req, res) => {
  const q = "INSERT INTO messages VALUES(?,?)"
});

export default router;
