import * as fs from "fs";
import path from "path";

export function writeTextToJsonFile(text: string, fileName: string): void {
  let jsonObject;
  try {
    jsonObject = JSON.parse(text);
  } catch (error) {
    jsonObject = { data: text };
  }

  const filePath = path.resolve(path.join(__dirname, fileName));

  fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2));
}
