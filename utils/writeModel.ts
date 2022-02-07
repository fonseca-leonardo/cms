import { writeFileSync } from "fs";
import { resolve } from "path";

export default function writeModel(path: string, data: any) {
  let modelPath = resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "content",
    "pages",
    "model.json"
  );

  if (path) {
    const folders = path.split("/");
    modelPath = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "content",
      "pages",
      ...folders,
      "model.json"
    );
  }

  writeFileSync(modelPath, JSON.stringify(data), { encoding: "utf-8" });
}
