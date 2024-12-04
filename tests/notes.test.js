import { beforeEach, expect, jest, test } from "@jest/globals";
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
