import { useEffect, useRef } from 'react';
import './InterestPit.css';

// A small bounded "pit" where each interest chip is a physical object you can
// grab, fling and watch bounce and settle — a playground instead of a static list.
const GRAVITY = 1400;
const WALL_RESTITUTION = 0.55;
const FLOOR_FRICTION = 0.86;
const AIR_DRAG = 0.998;
const KEY_IMPULSE = 260;

const InterestPit = ({ items }) => {
    const containerRef = useRef(null);
    const chipRefs = useRef([]);
    const bodies = useRef([]);
    const draggingRef = useRef(null);
    const frameRef = useRef(null);
    const reducedMotionRef = useRef(false);

    useEffect(() => {
        reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const container = containerRef.current;
        const { width: cw, height: ch } = container.getBoundingClientRect();

        bodies.current = chipRefs.current.map((el, i) => {
            const w = el.offsetWidth;
            const h = el.offsetHeight;
            const cols = Math.ceil(Math.sqrt(chipRefs.current.length));
            const col = i % cols;
            const row = Math.floor(i / cols);
            return {
                x: Math.min(cw - w, 16 + col * (w + 14) + Math.random() * 10),
                y: Math.min(ch - h, 16 + row * (h + 14)),
                vx: reducedMotionRef.current ? 0 : (Math.random() - 0.5) * 120,
                vy: 0,
                w,
                h,
            };
        });

        const draw = () => {
            bodies.current.forEach((b, i) => {
                const el = chipRefs.current[i];
                if (el) el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
            });
        };
        draw();

        let lastT = performance.now();

        const tick = (now) => {
            const dt = Math.min((now - lastT) / 1000, 0.032);
            lastT = now;
            const rect = container.getBoundingClientRect();
            const maxX = rect.width;
            const maxY = rect.height;
            const list = bodies.current;

            list.forEach((b, i) => {
                if (draggingRef.current === i) return;

                if (!reducedMotionRef.current) {
                    b.vy += GRAVITY * dt;
                }
                b.x += b.vx * dt;
                b.y += b.vy * dt;
                b.vx *= AIR_DRAG;

                if (b.x < 0) {
                    b.x = 0;
                    b.vx = -b.vx * WALL_RESTITUTION;
                } else if (b.x + b.w > maxX) {
                    b.x = maxX - b.w;
                    b.vx = -b.vx * WALL_RESTITUTION;
                }

                if (b.y + b.h > maxY) {
                    b.y = maxY - b.h;
                    b.vy = -b.vy * WALL_RESTITUTION;
                    b.vx *= FLOOR_FRICTION;
                    if (Math.abs(b.vy) < 20) b.vy = 0;
                } else if (b.y < 0) {
                    b.y = 0;
                    b.vy = -b.vy * WALL_RESTITUTION;
                }
            });

            // cheap pairwise separation so chips don't stack on top of each other
            for (let i = 0; i < list.length; i++) {
                for (let j = i + 1; j < list.length; j++) {
                    const a = list[i];
                    const b = list[j];
                    const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
                    const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
                    if (overlapX > 0 && overlapY > 0) {
                        if (overlapX < overlapY) {
                            const push = overlapX / 2 + 0.5;
                            const dir = a.x < b.x ? -1 : 1;
                            if (draggingRef.current !== i) a.x += dir * push;
                            if (draggingRef.current !== j) b.x -= dir * push;
                            const tmp = a.vx;
                            a.vx = b.vx * 0.5;
                            b.vx = tmp * 0.5;
                        } else {
                            const push = overlapY / 2 + 0.5;
                            const dir = a.y < b.y ? -1 : 1;
                            if (draggingRef.current !== i) a.y += dir * push;
                            if (draggingRef.current !== j) b.y -= dir * push;
                            const tmp = a.vy;
                            a.vy = b.vy * 0.5;
                            b.vy = tmp * 0.5;
                        }
                    }
                }
            }

            draw();
            frameRef.current = requestAnimationFrame(tick);
        };

        frameRef.current = requestAnimationFrame(tick);

        const handleResize = () => {
            const r = container.getBoundingClientRect();
            bodies.current.forEach((b) => {
                b.x = Math.min(b.x, Math.max(0, r.width - b.w));
                b.y = Math.min(b.y, Math.max(0, r.height - b.h));
            });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, [items]);

    const startDrag = (i) => (e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        const rect = containerRef.current.getBoundingClientRect();
        const body = bodies.current[i];
        draggingRef.current = i;
        const grab = {
            offsetX: e.clientX - rect.left - body.x,
            offsetY: e.clientY - rect.top - body.y,
            lastX: e.clientX,
            lastY: e.clientY,
            lastT: performance.now(),
        };

        const onMove = (ev) => {
            const now = performance.now();
            const dt = Math.max((now - grab.lastT) / 1000, 0.001);
            const r = containerRef.current.getBoundingClientRect();
            const maxX = Math.max(0, r.width - body.w);
            const maxY = Math.max(0, r.height - body.h);
            const nx = Math.min(maxX, Math.max(0, ev.clientX - r.left - grab.offsetX));
            const ny = Math.min(maxY, Math.max(0, ev.clientY - r.top - grab.offsetY));

            body.vx = reducedMotionRef.current ? 0 : (ev.clientX - grab.lastX) / dt;
            body.vy = reducedMotionRef.current ? 0 : (ev.clientY - grab.lastY) / dt;
            body.x = nx;
            body.y = ny;

            grab.lastX = ev.clientX;
            grab.lastY = ev.clientY;
            grab.lastT = now;
        };

        const onUp = () => {
            draggingRef.current = null;
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    };

    const nudge = (i) => (e) => {
        const step = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
        if (!step) return;
        e.preventDefault();
        const body = bodies.current[i];
        body.vx += step[0] * KEY_IMPULSE;
        body.vy += step[1] * KEY_IMPULSE - 260;
    };

    return (
        <div className="interestPit" ref={containerRef}>

            {items.map((item, i) => (
                <button
                    type="button"
                    key={item}
                    ref={(el) => (chipRefs.current[i] = el)}
                    className="interestChip"
                    aria-label={`${item} — draggable`}
                    onPointerDown={startDrag(i)}
                    onKeyDown={nudge(i)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default InterestPit;
