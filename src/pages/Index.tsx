// Página principal del juego Ta-Te-Ti
import { useGameState } from "@/hooks/useGameState";
import { Board } from "@/components/game/Board";
import { GameStatus } from "@/components/game/GameStatus";
import { ScoreBoard } from "@/components/game/ScoreBoard";
import { Confetti } from "@/components/game/Confetti";
import { Button } from "@/components/ui/button";
import { RotateCcw, Monitor, Bot, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const { board, currentPlayer, winnerInfo, gameOver, draw, score, mode, handleClick, restart, toggleMode } = useGameState();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 sm:gap-8 p-4 bg-background transition-colors duration-300">
      {/* Confeti al ganar */}
      {winnerInfo.winner && <Confetti />}

      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Ta-Te-Ti
        </h1>
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Cambiar tema"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Marcador */}
      <ScoreBoard score={score} />

      {/* Estado del juego */}
      <GameStatus
        currentPlayer={currentPlayer}
        winner={winnerInfo.winner}
        draw={draw}
        gameOver={gameOver}
      />

      {/* Tablero */}
      <Board
        board={board}
        winLine={winnerInfo.line}
        gameOver={gameOver}
        onCellClick={handleClick}
      />

      {/* Controles */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <Button onClick={restart} size="lg" className="gap-2 text-base px-8">
          <RotateCcw className="w-5 h-5" />
          Reiniciar partida
        </Button>
        <Button
          onClick={toggleMode}
          variant="outline"
          size="lg"
          className="gap-2 text-base"
        >
          {mode === "pvp" ? <Bot className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
          {mode === "pvp" ? "Jugar vs IA" : "Jugar vs Amigo"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        {mode === "ai" ? "Modo: Jugador vs IA (minimax)" : "Modo: Jugador vs Jugador"}
      </p>
    </div>
  );
};

export default Index;
