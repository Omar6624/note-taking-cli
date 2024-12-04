// import fs from "node:fs/promises";
// import { fileURLToPath } from "node:url";
// const redp = async () => {
//   const ps = new URL("./package.json", import.meta.url);
//   const ps1 = fileURLToPath(ps);
//   const demo = await fs.readFile(ps, "utf-8");
//   console.log(JSON.parse(demo));
//   console.log("sonme");
// };
// redp();
// const witew = async () => {
//   const newFile = new URL("./demo.js", import.meta.url);
//   const ps = fileURLToPath(newFile);
//   await fs.writeFile(ps, `console.log("something")`);
//   console.log("done");
// };
// witew();
