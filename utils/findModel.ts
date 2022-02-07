import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

export default function findModel(path: string): string {
  // path = 'outra-pagina/filho/neto'
  // path = ''
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
    // [outra-pagina,filho,neto]
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

  return readFileSync(modelPath).toString();
}
