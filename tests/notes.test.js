import { beforeEach, expect, jest, test, describe } from "@jest/globals";
jest.unstable_mockModule("../src/db.js", () => ({
  insertDb: jest.fn(),
  saveDb: jest.fn(),
  getDb: jest.fn(),
}));
const { insertDb, saveDb, getDb } = await import("../src/db.js");
const { newNotes, removeAllNotes, allNotes } = await import("../src/note.js");
beforeEach(() => {
  insertDb.mockClear();
  getDb.mockClear();
  saveDb.mockClear();
});
describe("note-cli", () => {
  test("new note inserts data and returns it", async () => {
    const note = {
      contents: "dummy note content",
      id: 1,
      tags: ["dummy", "tags"],
    };
    insertDb.mockResolvedValue(note);
    const result = await newNotes(note.contents, note.tags);
    expect(result.contents).toEqual(note.contents);
    expect(result.tags).toEqual(note.tags);
  });
  test("Shows all notes inside db", async () => {
    const db = {
      notes: ["note", "note", "note"],
    };
    getDb.mockResolvedValue(db);
    const result = await allNotes();
    expect(result).toEqual(db.notes);
  });
  test("Removes all notes inside db", async () => {
    const db = {
      notes: [
        {
          tags: ["something"],
          id: 1,
          contents: "do homework",
        },
        {
          tags: ["nothing"],
          id: 2,
          contents: "do not homework",
        },
      ],
    };
    getDb.mockResolvedValue(db);
    saveDb.mockImplementation((updatedDb) => {
      db.notes = updatedDb.notes;
      return Promise.resolve(updatedDb);
    });

    await removeAllNotes();
    expect(db.notes).toEqual([]);
  });
});
