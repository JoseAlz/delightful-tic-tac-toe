// Componente del tablero 3x3
import { Board as BoardType, Player } from "@/hooks/useGameState";
import { Square } from "./Square";

interface BoardProps {
  board: BoardType;
  winLine: number[] | null;
  gameOver: boolean;
  onCellClick: (index: number) => void;
}

export function Board({ board, winLine, gameOver, onCellClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-[340px] sm:max-w-[400px] mx-auto">
      {board.map((cell, i) => (
        <Square
          key={i}
          value={cell}
          onClick={() => onCellClick(i)}
          isWinning={winLine?.includes(i) ?? false}
          disabled={gameOver || cell !== null}
        />
      ))}
    </div>
  );
}
