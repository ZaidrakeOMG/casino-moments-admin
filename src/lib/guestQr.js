export function crearTextoQrInvitado({ codigoFiesta, invitadoId }) {
  const codigo = String(codigoFiesta || "").trim().toUpperCase();
  const id = String(invitadoId || "").trim();

  if (!codigo || !id) {
    throw new Error("Faltan codigoFiesta o invitadoId para crear el QR");
  }

  return `CMGUEST|${codigo}|${id}`;
}
