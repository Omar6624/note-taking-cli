export const listNotes = (notes) => {
  notes.forEach(({ tags, id, contents }) => {
    console.log("id :", id);
    console.log("tags :", tags);
    console.log("content :", contents);
    console.log("\n");
  });
};
