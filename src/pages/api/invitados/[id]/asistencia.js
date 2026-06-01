import { supabase } from "../../../../lib/supabaseServer.js";
import { jsonResponse, unauthorizedResponse, verifyAdminPin } from "../../../../lib/adminAuth.js";

export async function PATCH({ params, request }) {
  if (!verifyAdminPin(request)) {
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
    console.error("Error actualizando asistencia:", error);
    return jsonResponse({ ok: false, message: "No se pudo actualizar la asistencia" }, 500);
  }

  if (!data) {
    return jsonResponse({ ok: false, message: "No se encontró el invitado" }, 404);
  }

  return jsonResponse({ ok: true, invitado: data });
}
