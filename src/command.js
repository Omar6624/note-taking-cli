import yargs, { argv } from "yargs";
import { hideBin } from "yargs/helpers";

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
      console.info(argv);
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
    async (argv) => {}
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
    async (argv) => {}
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
    async (argv) => {}
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
      console.log("argv");
    }
  )

  .demandCommand(1)
  .parse();
