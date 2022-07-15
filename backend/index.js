const yargs = require("yargs");
const { getNotes, setNote } = require("./note.controller");
const pkg = require("./package.json");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note's title",
      demandOption: true,
    },
  },
  handler({ title }) {
    setNote(title);
    console.log("Add new note:", title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    console.log("Print:", await getNotes());
  },
});

yargs.parse();
