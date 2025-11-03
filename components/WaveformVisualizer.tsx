import { useEffect, useRef } from "react";

interface WaveformVisualizerProps {
  isActive: boolean;
}

export default function WaveformVisualizer({ isActive }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = "hsl(166, 82%, 35%)";
      ctx.lineWidth = 2;

      for (let x = 0; x < width; x++) {
        const y =
          height / 2 +
          Math.sin((x / 20 + phase) * 0.5) * 20 +
          Math.sin((x / 10 + phase) * 0.8) * 10;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      phase += 0.1;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <div className="w-full max-w-2xl">
      <canvas
        ref={canvasRef}
        width={600}
        height={80}
        className="w-full h-16 md:h-20"
        data-testid="waveform-canvas"
      />
    </div>
  );
}
