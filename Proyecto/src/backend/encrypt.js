const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

async function encriptarTexto(textoPlano) {
  const hash = await bcrypt.hash(textoPlano, SALT_ROUNDS);
  return hash;
}

async function compararTexto(textoPlano, hash) {
  const isMatch = await bcrypt.compare(textoPlano, hash);
  return isMatch;
}

module.exports = { encriptarTexto, compararTexto };