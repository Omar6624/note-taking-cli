import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
const redp = async () => {
  const ps = new URL("./package.json", import.meta.url);
  const ps1 = fileURLToPath(ps);
  console.log(ps, ps1);
  const demo = await fs.readFile(ps, "utf-8");
  console.log(JSON.parse(demo));
};

redp();
