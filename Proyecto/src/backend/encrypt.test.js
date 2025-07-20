import { describe, test, expect } from 'vitest';
import { encriptarTexto, compararTexto } from "./encrypt.js";

describe("Funciones de encriptación", () => {
  const textoOriginal = "contraseñaSegura123";
  
  test("encriptarTexto genera un hash distinto al texto original", async () => {
    const hash = await encriptarTexto(textoOriginal);
    expect(hash).not.toBe(textoOriginal);
    expect(typeof hash).toBe("string");
    expect(hash.length).toBeGreaterThan(0);
  });
  
  test("compararTexto retorna true si el texto coincide con el hash", async () => {
    const hash = await encriptarTexto(textoOriginal);
    const resultado = await compararTexto(textoOriginal, hash);
    expect(resultado).toBe(true);
  });
  
  test("compararTexto retorna false si el texto no coincide con el hash", async () => {
    const hash = await encriptarTexto(textoOriginal);
    const resultado = await compararTexto("textoFalso", hash);
    expect(resultado).toBe(false);
  });
});