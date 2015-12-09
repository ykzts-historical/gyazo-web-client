const characters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'];
const DECODE_BASE64_TABLE = [];
for (let [code, character] of characters.entries()) {
  DECODE_BASE64_TABLE[character.charCodeAt(0)] = code;
}
DECODE_BASE64_TABLE['='.charCodeAt(0)] = 0;

function decodeBase64(source) {
  let sourceLength = source.length;
  let padding = source.slice(sourceLength - 2).split('=').length - 1;
  let length = Math.floor((sourceLength + 3) / 4) * 3 - padding;
  let result = new Uint8Array(length);
  for (let cursor = 0, i = 0; i < sourceLength; cursor += 3, i += 4) {
    let bits = DECODE_BASE64_TABLE[source[i].charCodeAt(0)] << 18
      | DECODE_BASE64_TABLE[source[i + 1].charCodeAt(0)] << 12
      | DECODE_BASE64_TABLE[source[i + 2].charCodeAt(0)] << 6
      | DECODE_BASE64_TABLE[source[i + 3].charCodeAt(0)];
    result[cursor] = (bits >> 16) & 0xff;
    result[cursor + 1] = (bits >> 8) & 0xff;
    result[cursor + 2] = bits & 0xff;
  }
  return result;
}

export default decodeBase64;
