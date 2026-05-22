import { c as createComponent } from './astro-component_BclQpLmT.mjs';
import 'piccolore';
import { k as createRenderInstruction, s as renderHead, t as renderSlot, u as renderTemplate, q as renderComponent, p as maybeRenderHead } from './entrypoint_BVp2_Cdo.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const appName = "Casino Moments Admin";
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${appName}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/AUX_SISTEMAS/Desktop/casino-moments-admin/src/layouts/BaseLayout.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const appName = "Casino Moments Admin";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="admin-shell"> <section id="loginView" class="login-view"> <div class="ambient ambient-one"></div> <div class="ambient ambient-two"></div> <article class="access-card"> <div class="brand-top login-brand-top"> <div class="brand-mark image-brand"> <img src="/logo.png" alt="Casino Moments"> </div> <div class="brand-title"> <p class="eyebrow">Casino Moments</p> <h1>${appName}</h1> </div> </div> <div class="access-copy"> <span class="luxury-line"></span> <h2>Acceso a lista de invitados</h2> <p>Ingresa el PIN administrador y el ID de fiesta para abrir el control de recepción.</p> </div> <div class="login-form"> <label> <span>PIN administrador</span> <input id="adminPin" type="password" placeholder="Ingresa tu PIN" autocomplete="current-password"> </label> <label> <span>ID de fiesta</span> <input id="codigoFiesta" type="text" placeholder="Ej. CM-8F4K2" autocomplete="off"> </label> <button id="btnConsultar" class="primary-button" type="button">Entrar a la lista</button> </div> <p class="hint">El cliente debe entregar el ID generado en la app pública.</p> <section id="estado" class="state hidden"></section> </article> </section> <section id="resultado" class="dashboard-view hidden"> <header class="dashboard-header"> <div class="header-main"> <div class="brand-mark image-brand header-logo"> <img src="/logo.png" alt="Casino Moments"> </div> <div> <p class="eyebrow">Casino Moments</p> <h1>Lista de invitados</h1> <p class="subtitle">Consulta, búsqueda y control de asistencia para recepción.</p> </div> </div> <div class="header-actions"> <button id="btnCambiarFiesta" class="ghost-button" type="button">Cambiar fiesta</button> <button id="btnSalir" class="ghost-button danger-button" type="button">Salir</button> </div> </header> <section class="event-strip"> <div> <span>ID de fiesta</span> <strong id="resCodigo">-</strong> </div> <div> <span>Tipo</span> <strong id="tipoLista">-</strong> </div> </section> <div class="summary-grid"> <article class="metric"> <span>Registros</span> <strong id="totalRegistros">0</strong> <small>familias o responsables</small> </article> <article class="metric featured"> <span>Total personas</span> <strong id="totalPersonas">0</strong> <small>invitados registrados</small> </article> <article class="metric"> <span>Asistencia</span> <strong id="totalAsistentes">0</strong> <small>personas marcadas</small> </article> <article class="metric"> <span>Pendientes</span> <strong id="totalPendientes">0</strong> <small>por confirmar entrada</small> </article> </div> <section class="tools-card"> <label> <span>Buscar invitado</span> <input id="buscador" type="search" placeholder="Nombre, familia, teléfono o mesa"> </label> <button id="btnExportar" class="secondary-button" type="button">Exportar CSV</button> </section> <section id="dashboardEstado" class="state dashboard-state hidden"></section> <section id="listaContenedor" class="list-container"></section> </section> </main> ${renderScript($$result2, "C:/Users/AUX_SISTEMAS/Desktop/casino-moments-admin/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/AUX_SISTEMAS/Desktop/casino-moments-admin/src/pages/index.astro", void 0);
const $$file = "C:/Users/AUX_SISTEMAS/Desktop/casino-moments-admin/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
