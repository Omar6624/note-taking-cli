import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  removeNotes,
  removeAllNotes,
  newNotes,
  findNote,
  allNotes,
} from "./note.js";
import { listNotes } from "./utils.js";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "create a new note",
    (yargs) => {
      return yargs.positional("note", {
        describe: "The content of the note you want to create",
        type: "string",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const noteObj = await newNotes(argv.note, tags);
      console.log("note added", noteObj);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await allNotes();
      listNotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.conter",
        type: "string",
      });
    },
    async (argv) => {
      const matches = await findNote(argv.filter);
      if (matches) {
        listNotes(matches);
      } else {
        console.log("no matches or db empty");
      }
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        describe: "removes a note",
        type: "number",
      });
    },
    async (argv) => {
      const id = await removeNotes(argv.id);
      if (id === -1) {
        console.log("no note with this id");
      } else {
        console.log("removed sucessfully");
        return id;
      }
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on (optional)",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {}
  )
  .command(
    "clear",
    "clear all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
    }
  )

  .demandCommand(1)
  .parse();
