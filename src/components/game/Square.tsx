// Componente de celda individual del tablero
import { Player } from "@/hooks/useGameState";
import { cn } from "@/lib/utils";

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export function Square({ value, onClick, isWinning, disabled }: SquareProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "aspect-square rounded-xl bg-cell-bg border-2 border-border flex items-center justify-center",
        "text-5xl sm:text-6xl md:text-7xl font-bold font-mono transition-all duration-200",
        "hover:bg-cell-hover hover:scale-[1.03] active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        isWinning && "win-pulse border-accent",
        disabled && !value && "opacity-50 cursor-not-allowed",
      )}
    >
      {value && (
        <span
          className={cn(
            "cell-pop",
            value === "X" ? "text-player-x" : "text-player-o"
          )}
        >
          {value}
        </span>
      )}
    </button>
  );
}
