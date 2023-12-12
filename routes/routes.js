const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
var notesDB = require("../db/db.json");

// Serve the index.html page
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

// Serve the notes.html page
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

// Get all notes
router.get("/api/notes", (req, res) => {
  res.json(notesDB);
});

// Create a new note
router.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();
  const newNote = req.body;
  notesDB.push(newNote);
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesDB));
  res.json(notesDB);
});

// Delete a note by ID
router.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notesDB = notesDB.filter((note) => note.id !== id);
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesDB));
  res.json(notesDB);
});

module.exports = router;