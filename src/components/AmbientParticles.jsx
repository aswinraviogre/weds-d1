import React, { useEffect, useRef } from 'react';

/**
 * AmbientParticles:
 * Renders floating golden embers and slow-falling flower petals / temple dust
 * inspired by toran-telugu.invitestory.in.
 */
export function AmbientParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types: 'spark' (rising gold ember) and 'petal' (slow-falling jasmine/marigold petal)
    const particleCount = width < 768 ? 32 : 55;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const isPetal = i % 3 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        isPetal,
        size: isPetal ? 4 + Math.random() * 5 : 1 + Math.random() * 2.5,
        speedY: isPetal ? 0.35 + Math.random() * 0.5 : -(0.3 + Math.random() * 0.7),
        speedX: (Math.random() - 0.5) * 0.6,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.02,
        opacity: 0.2 + Math.random() * 0.6,
        opacitySpeed: 0.008 + Math.random() * 0.012,
        color: isPetal
          ? (Math.random() > 0.5 ? '#FFF6D8' : '#FFD272')
          : (Math.random() > 0.4 ? '#C9922F' : '#FFCF5C'),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    let isPaused = false;
    const handleVisibility = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isPaused) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.wobble += p.wobbleSpeed;
          p.x += p.speedX + Math.sin(p.wobble) * 0.4;
          p.y += p.speedY;
          p.opacity += Math.sin(p.wobble) * p.opacitySpeed;
          p.rotation += p.rotSpeed;

          // Clamping opacity
          const currentOpacity = Math.max(0.1, Math.min(0.85, p.opacity));

          // Screen wrap-around
          if (p.isPetal) {
            if (p.y > height + 20) {
              p.y = -20;
              p.x = Math.random() * width;
            }
          } else {
            if (p.y < -20) {
              p.y = height + 20;
              p.x = Math.random() * width;
            }
          }

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = currentOpacity;

          if (p.isPetal) {
            // Draw delicate jasmine / marigold petal
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 1.8, p.rotation, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Draw radiant gold glow ember
            ctx.fillStyle = p.color;
            ctx.shadowBlur = p.size * 3;
            ctx.shadowColor = '#FFCF5C';
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
      aria-hidden="true"
    />
  );
}
