import { sha256 } from "js-sha256"
import elliptic from "elliptic"

const secp256k1 = new elliptic.ec("secp256k1")

export const validateContentSignature = (signerPublicKey, content, contentSignature) => {
  const uncompressed = signerPublicKey.length === 128
  const publicKey = uncompressed ? `04${signerPublicKey}` : signerPublicKey

  const verifyingKey = secp256k1.keyFromPublic(publicKey, "hex")
  const messageHash = sha256(Buffer.from(content, "utf8"))

  try {
    if (!verifyingKey.verify(messageHash, contentSignature)) {
      console.log("invalid content signature")
      process.exit(1)
    }
  } catch (error) {
    console.log("invalid content signature", error.message)
    process.exit(1)
  }
}
