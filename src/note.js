import { insertDb, getDb, saveDb } from "./db.js";

export const newNotes = async (note, tags = []) => {
  const noteObj = {
    tags,
    id: Date.now(),
    contents: note,
  };
  await insertDb(noteObj);
  return noteObj;
};
export const allNotes = async () => {
  const { notes } = await getDb();
  return notes;
};

export const findNote = async (filter) => {
  const { notes } = await getDb();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNotes = async (id) => {
  const { notes } = await getDb();
  const match = notes.find((note) => note.id === id);
  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDb({ notes: newNotes });
    return id;
  }
};
export const removeAllNotes = async () => {
  await saveDb({ notes: [] });
};
