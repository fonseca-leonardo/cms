import { existsSync } from "fs";
import { resolve } from "path";

export default function modelPath(path: string): string {
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

  if (!existsSync(modelPath)) {
    return "";
  }

  return modelPath;
}
