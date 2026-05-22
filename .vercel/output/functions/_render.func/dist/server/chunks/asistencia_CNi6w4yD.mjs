import { v as verifyAdminPin, u as unauthorizedResponse, j as jsonResponse, s as supabase } from './adminAuth_DZBFUdBn.mjs';

async function PATCH({ params, request }) {
  if (!verifyAdminPin()) {
    return unauthorizedResponse();
  }

  const id = String(params.id || "").trim();

  if (!id) {
    return jsonResponse({ ok: false, message: "Falta el invitado" }, 400);
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, message: "Solicitud inválida" }, 400);
  }

  if (typeof body.asistio !== "boolean") {
    return jsonResponse({ ok: false, message: "El valor de asistencia no es válido" }, 400);
  }

  const { data, error } = await supabase
    .from("invitados")
    .update({ asistio: body.asistio })
    .eq("id", id)
    .select("id, asistio")
    .maybeSingle();

  if (error) {
    return jsonResponse({ ok: false, message: error.message }, 500);
  }

  if (!data) {
    return jsonResponse({ ok: false, message: "No se encontró el invitado o no hay permiso para actualizar la asistencia" }, 404);
  }

  return jsonResponse({ ok: true, invitado: data });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
