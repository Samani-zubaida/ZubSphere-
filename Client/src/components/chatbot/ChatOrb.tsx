import { useEffect, useRef } from "react";

interface ChatOrbProps {
  loading: boolean;
  size?: number;
}

interface Particle {
  theta: number;
  phi: number;
  radius: number;
  hueOffset: number;
  vx: number;
  vy: number;
  dx: number;
  dy: number;
}

const COLORS = ["0,212,255", "124,77,255", "255,107,129", "255,209,102"];

const ChatOrb = ({ loading, size = 96 }: ChatOrbProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rotationRef = useRef(0);
const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const COUNT = size > 60 ? 140 : 60;
    if (particlesRef.current.length !== COUNT) {
      particlesRef.current = Array.from({ length: COUNT }, () => ({
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
        radius: 0.82 + Math.random() * 0.18,
        hueOffset: Math.random(),
        vx: 0,
        vy: 0,
        dx: 0,
        dy: 0,
      }));
    }

    const handleMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleLeave = () => {
      mouseRef.current.active = false;
    };
    wrap.addEventListener("pointermove", handleMove);
    wrap.addEventListener("pointerleave", handleLeave);

    const center = size / 2;
    const sphereR = size * 0.42;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      rotationRef.current += loading ? 0.018 : 0.006;

      const projected = particlesRef.current
        .map((p) => {
          const theta = p.theta + rotationRef.current;
          const x3 = Math.sin(p.phi) * Math.cos(theta) * p.radius;
          const y3 = Math.cos(p.phi) * p.radius;
          const z3 = Math.sin(p.phi) * Math.sin(theta) * p.radius;

          const depthScale = (z3 + 1.6) / 2.6;
          let px = center + x3 * sphereR;
          let py = center + y3 * sphereR;

          if (mouseRef.current.active) {
            const dx = px - mouseRef.current.x;
            const dy = py - mouseRef.current.y;
            const dist = Math.hypot(dx, dy) || 1;
            const REPEL_R = size * 0.35;
            if (dist < REPEL_R) {
              const force = (1 - dist / REPEL_R) * 10;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }
          p.vx *= 0.86;
          p.vy *= 0.86;
          p.dx = (p.dx + p.vx * 0.15) * 0.9;
          p.dy = (p.dy + p.vy * 0.15) * 0.9;

          px += p.dx;
          py += p.dy;

          return { px, py, scale: depthScale, z3, hueOffset: p.hueOffset };
        })
        .sort((a, b) => a.z3 - b.z3);

      projected.forEach((p) => {
        const idx =
          ((Math.floor((p.hueOffset + rotationRef.current * 0.05) * COLORS.length) %
            COLORS.length) +
            COLORS.length) %
          COLORS.length;
        const color = COLORS[idx];
        const r = (loading ? 1.6 : 1.3) * (0.5 + p.scale * 0.9);
        const alpha = 0.35 + p.scale * 0.65;

        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.shadowBlur = loading ? 8 : 4;
        ctx.shadowColor = `rgba(${color},0.8)`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener("pointermove", handleMove);
      wrap.removeEventListener("pointerleave", handleLeave);
    };
  }, [size, loading]);

  return (
    <div ref={wrapRef} className="relative mx-auto" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full blur-2xl transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.35), rgba(124,77,255,0.15), transparent 70%)",
          opacity: loading ? 0.9 : 0.5,
        }}
      />
      <canvas ref={canvasRef} className="relative" />
    </div>
  );
};

export default ChatOrb;