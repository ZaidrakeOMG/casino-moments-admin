export function verifyAdminPin(request) {
  const expectedPin = import.meta.env.ADMIN_PIN;

  if (!expectedPin) {
    return true;
  }

  const receivedPin = request.headers.get("x-admin-pin") || "";
  return receivedPin === expectedPin;
}

export function unauthorizedResponse() {
  return new Response(
    JSON.stringify({ ok: false, message: "PIN de administrador incorrecto" }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
