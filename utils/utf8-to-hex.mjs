import utf8 from "utf8"

// taken from https://github.com/web3/web3.js/blob/1.x/packages/web3-utils/src/utils.js#L165

export const utf8ToHex = (str) => {
  str = utf8.encode(str)

  // remove \u0000 padding from either side
  str = str.replace(/^(?:\u0000)*/, "")
  str = str.split("").reverse().join("")
  str = str.replace(/^(?:\u0000)*/, "")
  str = str.split("").reverse().join("")

  let hex = ""
  for (var i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    const n = code.toString(16)
    hex += n.length < 2 ? "0" + n : n
  }

  return hex

  // return "0x" + hex;
}
