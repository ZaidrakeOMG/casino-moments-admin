export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export function unauthorizedResponse() {
  return jsonResponse({ ok: false, message: "No autorizado" }, 401);
}

export function verifyAdminPin(request) {
  const expectedPin = String(import.meta.env.ADMIN_PIN || "").trim();
  const receivedPin = String(request.headers.get("x-admin-pin") || "").trim();

  if (!expectedPin) {
    console.error("Falta ADMIN_PIN en variables de entorno.");
    return false;
  }

  return receivedPin === expectedPin;
}
