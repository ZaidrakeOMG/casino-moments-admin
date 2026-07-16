export const prerender = false;

import { supabase } from "../../../lib/supabaseServer.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json"
    }
  });
}

function limpiarTexto(valor) {
  return String(valor || "").trim();
}

function convertirFecha(valor) {
  const fecha = limpiarTexto(valor);

  if (!fecha) return "";

  // Formato normal de input type="date": 2026-07-24
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return fecha;
  }

  // También acepta 24/07/2026.
  const partes = fecha.split("/");

  if (partes.length === 3) {
    const dia = partes[0].padStart(2, "0");
    const mes = partes[1].padStart(2, "0");
    const anio = partes[2];

    if (anio.length === 4) {
      return `${anio}-${mes}-${dia}`;
    }
  }

  return fecha;
}

export async function GET({ url }) {
  const fechaOriginal = limpiarTexto(url.searchParams.get("fecha"));
  const fecha = convertirFecha(fechaOriginal);

  if (!fecha) {
    return jsonResponse({
      ok: false,
      message: "Selecciona la fecha del evento."
    }, 400);
  }

  const { data, error } = await supabase
    .from("fiestas_eventos")
    .select("id, codigo, nombre_completo, fecha_evento, nombre_salon, created_at")
    .eq("fecha_evento", fecha)
    .order("id", { ascending: false });

  if (error) {
    console.error("Error consultando códigos por fecha:", error);

    return jsonResponse({
      ok: false,
      message: error.message
    }, 500);
  }

  return jsonResponse({
    ok: true,
    eventos: Array.isArray(data) ? data : []
  });
}
