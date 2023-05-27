import * as dotenv from "dotenv"
dotenv.config()

const {
  BRC_721_VERSION,
  BRC_721_PAYMENT_ADDRESS, // Collection and Inscription Manifests
  BRC_721_PRIVATE_KEY, // Reveal and Inscription Manifests
  BRC_721_COLLECTION_INSCRIPTION_ID, // Reveal and Inscription Manifests

  // Collection Manifest
  BRC_721_SIGNER_PUBLIC_KEY,
  BRC_721_COLLECTION_NAME,
  BRC_721_COLLECTION_SYMBOL,
  BRC_721_MAX_SUPPLY,

  // Reveal Manifest
  BRC_721_METADATA_URL,

  // Inscription Manifest
  BRC_721_INSCRIPTION_PRICE,
} = process.env

export const validateEnvVariables = (type) => {
  const errors = []

  if (!BRC_721_VERSION) errors.push("BRC_721_VERSION not set.")

  if (type === "collection") {
    if (!BRC_721_PAYMENT_ADDRESS) errors.push("BRC_721_PAYMENT_ADDRESS not set.")
    if (!BRC_721_SIGNER_PUBLIC_KEY) errors.push("BRC_721_SIGNER_PUBLIC_KEY not set.")
    if (!BRC_721_COLLECTION_NAME) errors.push("BRC_721_COLLECTION_NAME not set.")
    if (!BRC_721_COLLECTION_SYMBOL) errors.push("BRC_721_COLLECTION_SYMBOL not set.")
    if (!BRC_721_MAX_SUPPLY) errors.push("BRC_721_MAX_SUPPLY not set.")
  }

  if (type === "reveal") {
    if (!BRC_721_PRIVATE_KEY) errors.push("BRC_721_PRIVATE_KEY not set.")
    if (!BRC_721_COLLECTION_INSCRIPTION_ID) errors.push("BRC_721_COLLECTION_INSCRIPTION_ID not set.")
    if (!BRC_721_METADATA_URL) errors.push("BRC_721_METADATA_URL not set.")
  }

  if (type === "inscription") {
    if (!BRC_721_PRIVATE_KEY) errors.push("BRC_721_PRIVATE_KEY not set.")
    if (!BRC_721_COLLECTION_INSCRIPTION_ID) errors.push("BRC_721_COLLECTION_INSCRIPTION_ID not set.")
    if (!BRC_721_PAYMENT_ADDRESS) errors.push("BRC_721_PAYMENT_ADDRESS not set.")
    if (!BRC_721_INSCRIPTION_PRICE) errors.push("BRC_721_INSCRIPTION_PRICE not set.")
  }

  if (errors.length > 0) {
    console.error(errors.join("\n"))
    console.error("please set the environment variables in .env file")
    process.exit(1)
  }
}
