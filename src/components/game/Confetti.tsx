// Animación de confeti simple al ganar
import { useEffect, useState } from "react";

const COLORS = [
  "hsl(220, 80%, 55%)", "hsl(350, 75%, 55%)", "hsl(45, 95%, 60%)",
  "hsl(160, 60%, 45%)", "hsl(280, 60%, 55%)", "hsl(30, 90%, 55%)",
];

interface Piece {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
}

export function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const p: Piece[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
    }));
    setPieces(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece absolute rounded-sm"
          style={{
            left: `${p.left}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
