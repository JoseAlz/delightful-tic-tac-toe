// Marcador de victorias
import { Score } from "@/hooks/useGameState";

interface ScoreBoardProps {
  score: Score;
}

export function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base font-semibold">
      <div className="flex flex-col items-center gap-1">
        <span className="text-player-x text-lg sm:text-xl font-bold">X</span>
        <span className="text-2xl sm:text-3xl font-mono">{score.X}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-muted-foreground text-xs uppercase tracking-wider">Empates</span>
        <span className="text-2xl sm:text-3xl font-mono text-muted-foreground">{score.draws}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-player-o text-lg sm:text-xl font-bold">O</span>
        <span className="text-2xl sm:text-3xl font-mono">{score.O}</span>
      </div>
    </div>
  );
}
