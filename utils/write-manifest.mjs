import fs from "fs"
import { resolve } from "path"

const writeJson = (path, json) =>
  fs.writeFileSync(resolve(process.cwd(), "manifests", path), JSON.stringify(json, null, 2), "utf8")

export const writeManifest = (fileName, json) => {
  writeJson(fileName, json)
}
