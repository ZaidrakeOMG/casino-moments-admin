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

function normalizarTexto(valor) {
  return limpiarTexto(valor)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function convertirFecha(valor) {
  const fecha = limpiarTexto(valor);

  if (!fecha) return "";

  // Si viene bien desde input type="date": 2026-07-24
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return fecha;
  }

  // Si viene como 24/07/2026
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
  const salon = limpiarTexto(url.searchParams.get("salon"));
  const fechaOriginal = limpiarTexto(url.searchParams.get("fecha"));
  const fecha = convertirFecha(fechaOriginal);

  if (!salon || !fecha) {
    return jsonResponse({
      ok: false,
      message: "Escribe el nombre del salón y la fecha del evento."
    }, 400);
  }

  const { data, error } = await supabase
    .from("fiestas_eventos")
    .select("id, codigo, nombre_completo, fecha_evento, nombre_salon, created_at")
    .eq("fecha_evento", fecha)
    .order("id", { ascending: false });

  if (error) {
    return jsonResponse({
      ok: false,
      message: error.message
    }, 500);
  }

  const salonBuscado = normalizarTexto(salon);

  const eventos = (Array.isArray(data) ? data : []).filter((evento) => {
    const salonDb = normalizarTexto(evento.nombre_salon);
    return salonDb.includes(salonBuscado) || salonBuscado.includes(salonDb);
  });

  return jsonResponse({
    ok: true,
    eventos,
    debug: {
      salon_buscado: salon,
      salon_normalizado: salonBuscado,
      fecha_recibida: fechaOriginal,
      fecha_convertida: fecha,
      registros_por_fecha: Array.isArray(data) ? data.length : 0,
      registros_finales: eventos.length,
      registros_fecha: data
    }
  });
}