
import { useState, useEffect } from "react";
import { GameBoard } from "@/components/GameBoard";
import { ScoreBoard } from "@/components/ScoreBoard";
import { GameStatus } from "@/components/GameStatus";
import { motion } from "framer-motion";

type Cell = "X" | "O" | null;

const Index = () => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningCombination, setWinningCombination] = useState<number[] | null>(null);

  const checkWinner = (squares: Cell[]): { winner: Cell; combination: number[] } | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], combination: [a, b, c] };
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinningCombination(result.combination);
      setScores(prev => ({
        ...prev,
        [result.winner]: prev[result.winner as keyof typeof prev] + 1
      }));
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null));
    setWinningCombination(null);
    setCurrentPlayer("X");
  };

  const winner = winningCombination ? board[winningCombination[0]] : null;
  const isDraw = !winner && board.every(cell => cell !== null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-game-primary to-white flex flex-col items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md">
        <ScoreBoard scores={scores} currentPlayer={currentPlayer} />
        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          winningCombination={winningCombination}
        />
        <GameStatus
          winner={winner}
          isDraw={isDraw}
          onPlayAgain={handlePlayAgain}
        />
      </div>
    </motion.div>
  );
};

export default Index;
