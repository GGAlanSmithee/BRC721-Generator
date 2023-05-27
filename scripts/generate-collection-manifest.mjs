import * as dotenv from "dotenv"
dotenv.config()

import { writeManifest } from "../utils/write-manifest.mjs"
import { validateEnvVariables } from "../utils/validate-env-variables.mjs"

validateEnvVariables("collection")

const {
  BRC_721_VERSION,
  BRC_721_COLLECTION_NAME,
  BRC_721_COLLECTION_SYMBOL,
  BRC_721_PAYMENT_ADDRESS,
  BRC_721_SIGNER_PUBLIC_KEY,
  BRC_721_MAX_SUPPLY,
  BRC_721_MAX_PER_ADDRESS,
  BRC_721_MAX_BLOCK_HEIGHT,
} = process.env

const manifest = {
  protocol: {
    name: "BRC721",
    version: BRC_721_VERSION,
  },
  type: "collection",
  name: BRC_721_COLLECTION_NAME,
  symbol: BRC_721_COLLECTION_SYMBOL,
  paymentAddress: BRC_721_PAYMENT_ADDRESS,
  signerPublicKey: BRC_721_SIGNER_PUBLIC_KEY,
  maxSupply: parseInt(BRC_721_MAX_SUPPLY),
}

if (BRC_721_MAX_PER_ADDRESS) manifest.maxPerAddress = parseInt(BRC_721_MAX_PER_ADDRESS)
if (BRC_721_MAX_BLOCK_HEIGHT) manifest.maxBlockHeight = parseInt(BRC_721_MAX_BLOCK_HEIGHT)

writeManifest("CollectionManifest.json", manifest)

console.log("CollectionManifest.json updated.")
