const fs = require('fs/promises')
const path = require('path')
const notePath = path.join(__dirname, db.json )

async function setNote(title) {
  const notes = getNotes()

  const note = {
    title, id: Date.now().toString()
  }

  notes.push(note)
  await fs.writeFile(notePath, JSON.stringify(notes))
}

async function getNotes() {
  const buffer = await fs.readFile(notePath, {encoding: "utf-8"})
  return JSON.parse(buffer)
}

module.exports = {
  setNote,  getNotes
}