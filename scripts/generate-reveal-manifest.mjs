import * as dotenv from "dotenv"
dotenv.config()

import { readManifests } from "../utils/read-manifests.mjs"
import { writeManifest } from "../utils/write-manifest.mjs"
import { createContentSignature } from "../utils/create-content-signature.mjs"
import { validateEnvVariables } from "../utils/validate-env-variables.mjs"
import { validateContentSignature } from "../utils/validate-content-signature.mjs"

validateEnvVariables("reveal")

const {
  BRC_721_VERSION,
  BRC_721_SIGNER_PUBLIC_KEY,
  BRC_721_PRIVATE_KEY,
  BRC_721_COLLECTION_INSCRIPTION_ID,
  BRC_721_METADATA_URL,
} = process.env

const { revealManifestContent } = readManifests()

const weight = revealManifestContent?.weight ? revealManifestContent.weight + 1 : 1

const content = JSON.stringify(
  {
    collectionInscriptionId: BRC_721_COLLECTION_INSCRIPTION_ID,
    metadataURL: BRC_721_METADATA_URL,
    weight,
  },
  null,
  2
)

const contentSignature = createContentSignature(content, BRC_721_PRIVATE_KEY)

validateContentSignature(BRC_721_SIGNER_PUBLIC_KEY, content, contentSignature)

const manifest = {
  protocol: {
    name: "BRC721",
    version: BRC_721_VERSION,
  },
  type: "reveal",
  content,
  contentSignature,
}

writeManifest("RevealManifest.json", manifest)

console.log("RevealManifest.json updated.")
