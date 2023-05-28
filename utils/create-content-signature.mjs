import { sha256 } from "js-sha256"
import elliptic from "elliptic"

const secp256k1 = new elliptic.ec("secp256k1")

// NOTE(Alan): Expects privateKey to be in hex format, use one of the converters to convert to hex

export const createContentSignature = (content, privateKey) => {
  const sk = secp256k1.keyFromPrivate(privateKey, "hex")
  const contentSignature = sk.sign(sha256(Buffer.from(content, "utf8"))).toDER("hex")

  return contentSignature
}
