import { supabase } from "../../../lib/supabaseServer.js";
import { jsonResponse, unauthorizedResponse, verifyAdminPin } from "../../../lib/adminAuth.js";

function obtenerNumeroMesa(nombre) {
  const match = String(nombre || "").match(/\d+/);
  return match ? Number(match[0]) : null;
}

function ordenarPorMesa(a, b) {
  const numeroA = a.mesa_numero ?? 999999;
  const numeroB = b.mesa_numero ?? 999999;

  if (numeroA !== numeroB) return numeroA - numeroB;
  return String(a.nombre || "").localeCompare(String(b.nombre || ""), "es");
}

export async function GET({ params, request }) {
  if (!verifyAdminPin(request)) return unauthorizedResponse();

  const codigo = String(params.codigo || "").trim().toUpperCase();

  if (!codigo) {
    return jsonResponse({ ok: false, message: "Falta el ID de fiesta" }, 400);
  }

  const { data: fiesta, error: fiestaError } = await supabase
    .from("fiestas")
    .select("id, codigo, usa_mesas, activa, created_at")
    .eq("codigo", codigo)
    .maybeSingle();

  if (fiestaError) {
    console.error("Error consultando fiesta:", fiestaError);
    return jsonResponse({ ok: false, message: "No se pudo consultar la fiesta" }, 500);
  }

  if (!fiesta) {
    return jsonResponse({ ok: false, message: "No se encontró una fiesta con ese ID" }, 404);
  }

  if (!fiesta.activa) {
    return jsonResponse({ ok: false, message: "Esta fiesta está inactiva" }, 403);
  }

  const { data: mesas, error: mesasError } = await supabase
    .from("mesas")
    .select("id, nombre, capacidad")
    .eq("fiesta_id", fiesta.id);

  if (mesasError) {
    console.error("Error consultando mesas:", mesasError);
    return jsonResponse({ ok: false, message: "No se pudieron consultar las mesas" }, 500);
  }

  const mesasOrdenadas = (mesas || [])
    .map((mesa) => ({ ...mesa, numero: obtenerNumeroMesa(mesa.nombre) }))
    .sort((a, b) => {
      const numeroA = a.numero ?? 999999;
      const numeroB = b.numero ?? 999999;
      if (numeroA !== numeroB) return numeroA - numeroB;
      return String(a.nombre || "").localeCompare(String(b.nombre || ""), "es");
    });

  const { data: invitados, error: invitadosError } = await supabase
    .from("invitados")
    .select("id, nombre, telefono, cantidad_invitados, asistio, mesa_id, created_at")
    .eq("fiesta_id", fiesta.id)
    .order("created_at", { ascending: true });

  if (invitadosError) {
    console.error("Error consultando invitados:", invitadosError);
    return jsonResponse({ ok: false, message: "No se pudieron consultar los invitados" }, 500);
  }

  const mesaMap = new Map(mesasOrdenadas.map((mesa) => [mesa.id, mesa]));

  const invitadosConMesa = (invitados || [])
    .map((invitado) => {
      const mesa = invitado.mesa_id ? mesaMap.get(invitado.mesa_id) : null;
      return {
        ...invitado,
        mesa_nombre: mesa?.nombre || null,
        mesa_numero: mesa?.numero ?? null,
        mesa_capacidad: mesa?.capacidad ?? null
      };
    })
    .sort(ordenarPorMesa);

  const personas = invitadosConMesa.reduce(
    (suma, invitado) => suma + Number(invitado.cantidad_invitados || 0),
    0
  );

  const asistencias = invitadosConMesa.reduce(
    (suma, invitado) => invitado.asistio ? suma + Number(invitado.cantidad_invitados || 0) : suma,
    0
  );

  return jsonResponse({
    ok: true,
    fiesta,
    mesas: mesasOrdenadas,
    invitados: invitadosConMesa,
    totales: {
      registros: invitadosConMesa.length,
      personas,
      asistencias,
      pendientes: Math.max(personas - asistencias, 0)
    }
  });
}
