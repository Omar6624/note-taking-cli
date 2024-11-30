import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
const tempPath = new URL("../db.json", import.meta.url);
const DB_PATH = fileURLToPath(tempPath);
console.log(DB_PATH);

export const getDb = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};
export const saveDb = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};
export const insertDb = async (note) => {
  const db = await getDb();
  db.notes.push(note);
  await saveDb(db);
  return note;
};
