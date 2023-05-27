import { sha256 } from "js-sha256"
import elliptic from "elliptic"
const { ec } = elliptic

const secp256k1 = new ec("secp256k1")

export const createContentSignature = (content, privateKey) => {
  // todo, turn into hex
  const privateKeyHex = privateKey
  const sk = secp256k1.keyFromPrivate(privateKeyHex, "hex")
  const contentSignature = sk.sign(sha256(Buffer.from(content, "utf8"))).toDER("hex")

  return contentSignature
}
