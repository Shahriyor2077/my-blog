import { useEffect, useState } from "react";

const DURATION = 750;

const LoadingSpinner = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-ink">
      <div className="mb-8 grid size-14 place-items-center rounded-full bg-acid font-display text-lg font-bold text-ink">
        SZ
      </div>
      <div className="h-px w-48 overflow-hidden bg-white/10">
        <div className="h-full bg-acid" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 font-mono text-xs tracking-[0.2em] text-dim">
        {String(progress).padStart(3, "0")}%
      </p>
    </div>
  );
};

export default LoadingSpinner;
