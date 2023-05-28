import * as dotenv from "dotenv"
dotenv.config()

import { writeManifest } from "../utils/write-manifest.mjs"
import { createContentSignature } from "../utils/create-content-signature.mjs"
import { validateEnvVariables } from "../utils/validate-env-variables.mjs"
import { validateContentSignature } from "../utils/validate-content-signature.mjs"

validateEnvVariables("inscription")

const {
  BRC_721_VERSION,
  BRC_721_PAYMENT_ADDRESS,
  BRC_721_INSCRIPTION_PRICE,
  BRC_721_PRIVATE_KEY,
  BRC_721_SIGNER_PUBLIC_KEY,
  BRC_721_COLLECTION_INSCRIPTION_ID,
} = process.env

const content = JSON.stringify(
  {
    collectionInscriptionId: BRC_721_COLLECTION_INSCRIPTION_ID,
    price: parseInt(BRC_721_INSCRIPTION_PRICE),
    initialOwnerAddress: BRC_721_PAYMENT_ADDRESS,
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
  type: "inscription",
  content,
  contentSignature,
}

writeManifest("InscriptionManifest.json", manifest)

console.log("InscriptionManifest.json updated.")
