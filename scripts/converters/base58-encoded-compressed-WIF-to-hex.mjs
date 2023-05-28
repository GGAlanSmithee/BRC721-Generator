import bs58 from "bs58"
import * as dotenv from "dotenv"
dotenv.config()

const { BRC_721_PRIVATE_KEY } = process.env

if (!BRC_721_PRIVATE_KEY) {
  console.log("BRC_721_PRIVATE_KEY is not defined. Set it in the .env file.")
  process.exit(1)
}

try {
  const privateKey = BRC_721_PRIVATE_KEY.replace("p2pkh:", "")
    .replace("p2wpkh-p2sh:", "")
    .replace("p2wpkh:", "")
  const bytes = bs58.decode(privateKey)
  const privateKeyHex = Buffer.from(bytes).toString("hex")
  const withoutPrefix = privateKeyHex.slice(2)
  const withoutChecksum = withoutPrefix.slice(0, withoutPrefix.length - 8)
  const withoutPadding = withoutChecksum.slice(0, withoutChecksum.length - 2)

  console.log("Converted to hex\n")
  console.log("Replace your BRC_721_PRIVATE_KEY with this in the .env file:\n")
  console.log(withoutPadding)
} catch (error) {
  console.log("Error:", error.message)
  process.exit(1)
}
