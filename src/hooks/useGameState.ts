// Hook principal del estado del juego Ta-Te-Ti
import { useState, useCallback } from "react";
import { useSoundEffects } from "./useSoundEffects";

export type Player = "X" | "O" | null;
export type Board = Player[];
export type GameMode = "pvp" | "ai";

// Líneas ganadoras
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontales
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticales
  [0, 4, 8], [2, 4, 6],             // diagonales
];

function checkWinner(board: Board): { winner: Player; line: number[] | null } {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

// IA simple con minimax
function minimax(board: Board, isMaximizing: boolean): number {
  const { winner } = checkWinner(board);
  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (isDraw(board)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X";
        best = Math.min(best, minimax(board, true));
        board[i] = null;
      }
    }
    return best;
  }
}

function getAiMove(board: Board): number {
  let bestScore = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      const score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

export interface Score {
  X: number;
  O: number;
  draws: number;
}

export function useGameState() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winnerInfo, setWinnerInfo] = useState<{ winner: Player; line: number[] | null }>({ winner: null, line: null });
  const [gameOver, setGameOver] = useState(false);
  const [draw, setDraw] = useState(false);
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draws: 0 });
  const [mode, setMode] = useState<GameMode>("pvp");
  const { playPlaceSound, playWinSound, playDrawSound } = useSoundEffects();

  const handleClick = useCallback((index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const result = checkWinner(newBoard);
    if (result.winner) {
      setBoard(newBoard);
      setWinnerInfo(result);
      setGameOver(true);
      setScore((s) => ({ ...s, [result.winner!]: s[result.winner!] + 1 }));
      return;
    }

    if (isDraw(newBoard)) {
      setBoard(newBoard);
      setDraw(true);
      setGameOver(true);
      setScore((s) => ({ ...s, draws: s.draws + 1 }));
      return;
    }

    // Turno de la IA
    if (mode === "ai" && currentPlayer === "X") {
      const aiMove = getAiMove(newBoard);
      if (aiMove !== -1) {
        // Pequeño delay para la IA
        setBoard(newBoard);
        setCurrentPlayer("O");
        setTimeout(() => {
          const aiBoard = [...newBoard];
          aiBoard[aiMove] = "O";
          const aiResult = checkWinner(aiBoard);
          if (aiResult.winner) {
            setBoard(aiBoard);
            setWinnerInfo(aiResult);
            setGameOver(true);
            setScore((s) => ({ ...s, O: s.O + 1 }));
            return;
          }
          if (isDraw(aiBoard)) {
            setBoard(aiBoard);
            setDraw(true);
            setGameOver(true);
            setScore((s) => ({ ...s, draws: s.draws + 1 }));
            return;
          }
          setBoard(aiBoard);
          setCurrentPlayer("X");
        }, 400);
        return;
      }
    }

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }, [board, currentPlayer, gameOver, mode]);

  const restart = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinnerInfo({ winner: null, line: null });
    setGameOver(false);
    setDraw(false);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((m) => (m === "pvp" ? "ai" : "pvp"));
    restart();
  }, [restart]);

  return { board, currentPlayer, winnerInfo, gameOver, draw, score, mode, handleClick, restart, toggleMode };
}
