const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notePath = path.join(__dirname, "db.json");

async function setNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notePath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await JSON.parse(
    await fs.readFile(notePath, { encoding: "utf-8" })
  );
  return Array.isArray(notes) ? notes : [];
}

module.exports = {
  setNote,
  getNotes,
};
