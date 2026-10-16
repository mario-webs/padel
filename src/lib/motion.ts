import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Equivalentes GSAP de los tokens CSS --ease-out / --ease-in-out.
export const EASE_OUT = 'power4.out';
export const EASE_IN_OUT = 'expo.inOut';

export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Una sola instancia global de Lenis que sobrevive a las navegaciones.
export const lenis = reducedMotion ? null : new Lenis({ autoRaf: false, lerp: 0.1 });

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

document.addEventListener('astro:after-swap', () => {
  if (!lenis) return;
  // El swap de Astro reemplaza los atributos de <html> y borra las clases de Lenis.
  document.documentElement.classList.add(...lenis.className.split(' '));
  lenis.scrollTo(0, { immediate: true });
});

/**
 * Registra animaciones de página: se crean en cada `astro:page-load`
 * y se revierten en `astro:before-swap`. `setup` debe comprobar que sus
 * elementos existen, porque se ejecuta en todas las páginas.
 * Con reduced motion no se ejecuta: el HTML ya está en su estado final.
 */
export function onPage(setup: () => void | (() => void)) {
  if (reducedMotion) return;
  let ctx: gsap.Context | undefined;
  document.addEventListener('astro:page-load', () => {
    ctx = gsap.context(setup);
    ScrollTrigger.refresh();
  });
  document.addEventListener('astro:before-swap', () => {
    ctx?.revert();
    ctx = undefined;
  });
}

/** Se resuelve cuando termina el preloader (o enseguida si no hay). */
export function introDone(): Promise<void> {
  if (!document.documentElement.hasAttribute('data-preload')) return Promise.resolve();
  return new Promise((resolve) => document.addEventListener('intro:done', () => resolve(), { once: true }));
}

/** Titulares de sección: cada línea sube desde detrás de una máscara al entrar. */
onPage(() => {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    // Etiqueta propia: los <br> pasan a espacios ("Hablemos de pádel") y sin el uppercase del CSS.
    const plain = document.createElement('div');
    plain.innerHTML = el.innerHTML.replace(/<br\s*\/?>/gi, ' ');
    el.setAttribute('aria-label', plain.textContent!.replace(/\s+/g, ' ').trim());
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      // 'hidden' ocultaría el título entero: solo se ocultan las líneas; el título conserva su aria-label.
      aria: 'none',
      autoSplit: true,
      onSplit: (self) => {
        self.lines.forEach((line) => line.setAttribute('aria-hidden', 'true'));
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1,
          ease: EASE_OUT,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      },
    });
  });
});

/** Botones magnéticos: siguen al cursor un poco y vuelven con un muelle suave. */
onPage(() => {
  if (!finePointer) return;
  const cleanups = gsap.utils.toArray<HTMLElement>('[data-magnetic]').map((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.3);
      y((e.clientY - r.top - r.height / 2) * 0.3);
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  });
  return () => cleanups.forEach((fn) => fn());
});

export { gsap, ScrollTrigger, SplitText };
