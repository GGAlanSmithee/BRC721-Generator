import fs from "fs"
import { resolve } from "path"

const readJson = (path) => {
  try {
    return JSON.parse(fs.readFileSync(resolve(process.cwd(), "manifests", path), "utf8"))
  } catch {
    return null
  }
}

export const readManifests = () => {
  const collectionManifest = readJson("CollectionManifest.json")
  const inscriptionManifest = readJson("InscriptionManifest.json")
  const inscriptionManifestContent = inscriptionManifest ? JSON.parse(inscriptionManifest["content"]) : null
  const revealManifest = readJson("RevealManifest.json")
  const revealManifestContent = revealManifest ? JSON.parse(revealManifest["content"]) : null

  return {
    collectionManifest,
    inscriptionManifest,
    inscriptionManifestContent,
    revealManifest,
    revealManifestContent,
  }
}
