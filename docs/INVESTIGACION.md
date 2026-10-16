# Investigación — Web club de pádel (demo, coste 0)

Fecha: 2026-10-15. Referencia para construir la web siguiendo el plan aprobado.

## 1. Referentes visuales

### Pádel (el sector)
| Referencia | Qué copiar | Qué evitar |
|---|---|---|
| [Webflow — Best Padel Websites](https://webflow.com/made-in-webflow/padel) (Padel Tech, Majo Padel, Pulso Padel) | Galería del sector: ver qué hace todo el mundo | Casi todas: hero de foto + "Book now" + cards. Es el listón a superar, no a imitar |
| [Blanca Padel — Series Eight (Awwwards)](https://www.awwwards.com/inspiration/thumbnail-submission-681dd74f4c0ef592976326) | Estética editorial premium aplicada al pádel | — |
| [Behance — Padel Tennis](https://www.behance.net/search/projects/Padel%20tennis) (PADEL CORE, Padel Social Club) | Branding y paletas del sector | Son conceptos, no webs en producción |
| [Hotmint — qué necesita una web de club](https://www.hotmintdigital.co.uk/post/padel-website-template) | Checklist de contenido: botón "Reservar" siempre visible, ubicación clara, precios transparentes, Playtomic | — |

**Conclusión**: el sector va muy por detrás. Una web de pádel con motion de nivel Awwwards destaca sola. Las ideas de dirección hay que tomarlas de webs de deporte/producto, no de otros clubes.

### Deporte / producto (nivel Awwwards)
| Referencia | Técnica a tomar | Dónde la usamos |
|---|---|---|
| [Lando Norris — OFF+BRAND](https://designrush.com/best-designs/websites/lando-norris-website-design) | Layout modular "On Track / Off Track", overlays reactivos al cursor sobre el hero | Separar "Juega" (pistas/clases) de "Equípate" (tienda); cursor que deforma la máscara del hero |
| [SOLK — Awwwards SOTD jun 2025](https://www.awwwards.com/sites/solk) | Logo que se transforma en producto; "túnel" de zoom ligado al scroll | Preloader: bola → "o" del logo; zoom hacia la pala en el showcase |
| [Rollie — Awwwards SOTD](https://www.awwwards.com/sites/rollie) | Producto como protagonista, tipografía gigante | Showcase de palas |
| [Awwwards — colección Product Page](https://www.awwwards.com/awwwards/collections/product-page/) / [Sport](https://www.awwwards.com/inspiration_search/sport/) | Patrones de ficha de producto | `/tienda/[slug]` |
| [Apple AirPods Pro (recreación CSS-Tricks)](https://css-tricks.com/?p=308477) | Canvas pinneado; el scroll elige el frame | Hero (en nuestro caso, dibujado en código, no frames) |

## 2. Hallazgos técnicos

### GSAP es gratis entero
Desde la compra por Webflow, **todos los plugins** (ScrollTrigger, SplitText, MorphSVG, MotionPath, Flip, Draggable, Observer, ScrollSmoother) son gratis, también para uso comercial. Basta con `npm install gsap` e importar `gsap/SplitText`, etc. Las guías antiguas que piden token o registro privado están desfasadas.
→ Usamos **SplitText** (titulares), **MotionPath** (bola conductora), **Draggable + Inertia** (carrusel de testimonios), **Flip** (filtros de la tienda).

### Lenis + ScrollTrigger + Astro View Transitions
Montaje habitual:
```ts
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
Ciclo de vida en Astro (`DOMContentLoaded` solo salta en la carga completa, no al navegar con view transitions):
- `astro:page-load` → crear `gsap.context()` + animaciones de la página.
- `astro:before-swap` → `ctx.revert()` y `ScrollTrigger.killAll()` antes de cambiar de página.
- Lenis: una sola instancia global; tras cambiar de página, `lenis.scrollTo(0, {immediate:true})` + `ScrollTrigger.refresh()`.

**Problema conocido**: [Lenis issue #348](https://polar.sh/darkroomengineering/lenis/issues/348): error "Too many calls to Location or History APIs" con view transitions activas. Mitigación: no usar el sync de anclas/hash de Lenis; probarlo pronto (fase 1). Si da problemas, plan B: quitar las view transitions de Astro y dejar solo la cortina GSAP entre páginas.

### Scroll-scrub tipo Apple
Patrón: sección pinneada o `position: sticky`, un canvas, y el progreso de ScrollTrigger elige qué se dibuja ([foro GSAP](https://greensock.com/forums/topic/25188-airpods-image-sequence-animation-using-scrolltrigger/page/3/)). Con frames se usan 120–180 en desktop y 60–90 en móvil. **Nosotros dibujamos la pista en código** (sin frames): pesa ~0 KB, se ve nítido en cualquier resolución y cuesta 0.
- `scrub: true` + `ease: "none"` en las timelines con scrub (consejo del equipo GSAP).

### CSS scroll-driven animations (`animation-timeline: view()`)
Funcionan en Chrome/Edge 115+ y Safari 26. En Firefox las fuentes no coinciden.
→ Usarlas **solo** para reveals sencillos (fade/slide al entrar) dentro de `@supports (animation-timeline: view())`, con fallback estático. Todo lo complejo (pin, scrub, stacking) con GSAP.

### Pin horizontal y stacking cards
- Horizontal: `gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), scrollTrigger: { pin: true, scrub: 1, end: () => '+=' + track.scrollWidth, invalidateOnRefresh: true } })`. Ejemplos: [Tuts+ horizontal panels](https://webdesign.tutsplus.com/create-horizontal-scroll-animations-with-gsap-scrolltrigger--cms-108881t).
- Stacking: cada card con `position: sticky; top: X` y GSAP solo escala/oscurece la anterior; menos JS y más robusto que pinnear cada card ([foro GSAP — stacking](https://gsap.com/community/forums/topic/39367-scrolltrigger-stacking-cards-animation-logic-to-create-any-effect-yes-even-yours/)).
- En móvil (<768px): quitar el pin horizontal → scroll horizontal nativo con `scroll-snap`.

## 3. Recursos gratis (coste 0)
| Necesidad | Recurso | Licencia |
|---|---|---|
| Motion | GSAP, Lenis | Gratis / MIT |
| Framework | Astro, React | MIT |
| Tipografía display | **Big Shoulders Display** o **Anton** (Google Fonts, vía `@fontsource`) | SIL OFL: se puede autoalojar |
| Tipografía cuerpo | **Inter Tight** / **Geist** | SIL OFL |
| Fotos | Unsplash, Pexels | Gratis, sin atribución obligatoria |
| Iconos | Lucide / Phosphor | MIT |
| Hosting | Cloudflare Pages / Netlify | Plan gratis + subdominio |

**Cambio respecto al plan**: Clash Display (Fontshare) es gratis, pero su licencia ITF limita autoalojar ("font serving") y puede pedir que se cite al autor. Para no tener dudas legales usamos fuentes OFL autoalojadas con `@fontsource`.

## 4. Reglas de calidad (resumen de skills + investigación)
1. **Un efecto icónico por sección**, no tres. Hasta el autor de la demo "Tennis Academy" de Webflow admite que se pasó con las animaciones.
2. Animar solo `transform`, `opacity`, `clip-path`. Sin `filter: blur` en scrub.
3. `prefers-reduced-motion` → sin pin/scrub/preloader; mismo contenido.
4. Móvil primero: pines desactivados o simplificados, cursor custom solo con `pointer: fine`.
5. CTA "Reservar" fijo y visible siempre (consejo del sector).
6. Lighthouse móvil ≥90; LCP sin depender de JS (titular del hero en HTML, el canvas aparece después).

## 5. Flujo de trabajo con skills
| Fase | Skill |
|---|---|
| Dirección de arte + `DESIGN.md` | `design-taste-frontend`, `impeccable` (shape) |
| Maquetación | `frontend-ui-engineering` |
| Motion | `animate`, `apple-design` (springs, drag), `emil-design-eng` (detalles) |
| Revisión | `review-animations`, `animation-performance`, `break-ui`, `impeccable` (audit/polish) |
| Verificación visual | Playwright MCP (capturas 1440/390, reduced-motion) |
