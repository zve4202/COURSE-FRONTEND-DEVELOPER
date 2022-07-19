const yargs = require("yargs");
const pkg = require("./package.json");
const {
  addNote,
  printNotes,
  removeNote,
  updateNote,
} = require("./note.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "delete",
  describe: "Remove note by id from list",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
  },
  handler({ id, title }) {
    removeNote(id);
  },
});

yargs.command({
  command: "edit",
  describe: "Edit note by id",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ id, title }) {
    updateNote({ id, title });
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes();
  },
});

yargs.parse();
