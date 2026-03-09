// Estado actual del juego: turno, ganador o empate
import { Player } from "@/hooks/useGameState";
import { cn } from "@/lib/utils";

interface GameStatusProps {
  currentPlayer: Player;
  winner: Player;
  draw: boolean;
  gameOver: boolean;
}

export function GameStatus({ currentPlayer, winner, draw, gameOver }: GameStatusProps) {
  if (winner) {
    return (
      <h2 className="text-3xl sm:text-4xl font-bold animate-scale-in">
        ¡<span className={cn(winner === "X" ? "text-player-x" : "text-player-o")}>{winner}</span> gana! 🎉
      </h2>
    );
  }

  if (draw) {
    return (
      <h2 className="text-3xl sm:text-4xl font-bold text-accent animate-scale-in">
        ¡Empate! 🤝
      </h2>
    );
  }

  return (
    <h2 className="text-2xl sm:text-3xl font-semibold transition-all">
      Turno de{" "}
      <span className={cn(
        "font-bold font-mono text-3xl sm:text-4xl",
        currentPlayer === "X" ? "text-player-x" : "text-player-o"
      )}>
        {currentPlayer}
      </span>
    </h2>
  );
}
