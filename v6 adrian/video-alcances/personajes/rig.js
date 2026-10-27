      // ---- rig de personajes (lo inserta tools/armar.mjs; no editar en compositions/) ----
      // Cada personaje es un SVG con ids «prefijo-parte». Las articulaciones giran sobre su punto fijo;
      // el estado vive en un objeto que GSAP anima y `aplicar` lo escribe en el SVG.
      const RIGS = {
        operario: {
          juntas: { hI: [206, 310], cI: [206, 440], mI: [206, 560], hD: [394, 310], cD: [394, 440], mD: [394, 560], pI: [262, 590], pD: [338, 590], cab: [300, 262] },
          ojos: 194, props: ["cel", "bolsa", "tabla", "lapiz"], todo: [300, 892],
        },
        lucrecia: {
          juntas: { hI: [212, 352], cI: [204, 470], mI: [204, 580], hD: [388, 352], cD: [396, 470], mD: [396, 580], cab: [300, 300] },
          ojos: 216, props: ["pila1", "pila2", "pila3", "calc"], todo: [300, 640],
        },
        cliente: {
          juntas: { hI: [206, 310], cI: [206, 440], mI: [206, 560], hD: [394, 310], cD: [394, 440], mD: [394, 560], pI: [262, 590], pD: [338, 590], cab: [300, 262] },
          ojos: 194, props: ["billetes", "lapicero"], todo: [300, 892],
        },
      };
      function rig(px, tipo, inicial = {}) {
        const cfg = RIGS[tipo];
        const el = (id) => document.getElementById(px + "-" + id);
        const st = { ojos: 1, x: 0, y: 0, rot: 0 };
        for (const k of Object.keys(cfg.juntas)) st[k] = 0;
        for (const k of cfg.props) st[k] = 0;
        Object.assign(st, inicial);
        const nodos = {};
        for (const k of [...Object.keys(cfg.juntas), ...cfg.props, "ojos", "todo"]) nodos[k] = el(k);
        function aplicar() {
          for (const [k, [x, y]] of Object.entries(cfg.juntas)) {
            if (nodos[k]) nodos[k].setAttribute("transform", `rotate(${st[k]} ${x} ${y})`);
          }
          for (const k of cfg.props) if (nodos[k]) nodos[k].setAttribute("opacity", st[k]);
          if (nodos.ojos) nodos.ojos.setAttribute("transform", `translate(0 ${cfg.ojos * (1 - st.ojos)}) scale(1 ${st.ojos})`);
          if (nodos.todo) nodos.todo.setAttribute("transform", `translate(${st.x} ${st.y}) rotate(${st.rot} ${cfg.todo[0]} ${cfg.todo[1]})`);
        }
        aplicar();
        return { st, aplicar };
      }
      // Animaciones de personaje sobre una línea de tiempo `tl`
      const pose = (tl, r, p, t, d = 0.5, ease = "power2.inOut") => tl.to(r.st, { ...p, duration: d, ease, onUpdate: r.aplicar }, t);
      const parpadea = (tl, r, t) => {
        tl.to(r.st, { ojos: 0.08, duration: 0.07, ease: "power1.in", onUpdate: r.aplicar }, t);
        tl.to(r.st, { ojos: 1, duration: 0.1, ease: "power1.out", onUpdate: r.aplicar }, t + 0.07);
      };
      // Repite un gesto corto n veces (digitar, escribir, teclear): alterna dos valores de una junta
      const gesto = (tl, r, junta, a, b, t, n, paso = 0.16) => {
        for (let i = 0; i < n; i++) tl.to(r.st, { [junta]: i % 2 ? a : b, duration: paso, ease: "sine.inOut", onUpdate: r.aplicar }, t + i * paso);
      };
      // Camina: piernas alternas y un leve rebote del cuerpo mientras se desplaza en x
      const camina = (tl, r, t, dur, dx, pasos) => {
        tl.to(r.st, { x: r.st.x + dx, duration: dur, ease: "none", onUpdate: r.aplicar }, t);
        const p = dur / pasos;
        for (let i = 0; i < pasos; i++) {
          const s = i % 2 ? 1 : -1;
          tl.to(r.st, { pI: 14 * s, pD: -14 * s, hI: -10 * s, hD: -10 * s, y: -10, duration: p / 2, ease: "sine.out", onUpdate: r.aplicar }, t + i * p);
          tl.to(r.st, { y: 0, duration: p / 2, ease: "sine.in", onUpdate: r.aplicar }, t + i * p + p / 2);
        }
        tl.to(r.st, { pI: 0, pD: 0, hI: 0, hD: 0, duration: 0.2, ease: "sine.out", onUpdate: r.aplicar }, t + dur);
      };
      // ---- fin del rig ----
