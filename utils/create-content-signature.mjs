import { sha256 } from "js-sha256"
import elliptic from "elliptic"
import { utf8ToHex } from "./utf8-to-hex.mjs"

const secp256k1 = new elliptic.ec("secp256k1")

export const createContentSignature = (content, privateKey) => {
  const privateKeyHex = utf8ToHex(privateKey)
  const sk = secp256k1.keyFromPrivate(privateKeyHex, "hex")
  const contentSignature = sk.sign(sha256(Buffer.from(content, "utf8"))).toDER("hex")

  return contentSignature
}
