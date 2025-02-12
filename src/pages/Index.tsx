import { useState, useEffect } from "react";
import { GameBoard } from "@/components/GameBoard";
import { ScoreBoard } from "@/components/ScoreBoard";
import { GameStatus } from "@/components/GameStatus";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

type Cell = "X" | "O" | null;

const Index = () => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningCombination, setWinningCombination] = useState<number[] | null>(null);
  const [konami, setKonami] = useState<number[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

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

  const closeEasterEgg = () => setShowEasterEgg(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.keyCode];
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      setKonami(newKonami);

      if (newKonami.join(',') === konamiCode.join(',')) {
        setShowEasterEgg(true);
        Cookies.set('easter_egg_found', 'true', { expires: 365 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

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
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
              onClick={closeEasterEgg}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-game-secondary text-white p-8 rounded-2xl shadow-2xl text-center font-mono"
                onClick={e => e.stopPropagation()}
              >
                <pre className="text-green-400 text-xs mb-4">
{`
   _____   __   __  __   __   _____   _   _____   _____   
  |__  /  |  | |  ||  | |  | /  ___| | | /  ___/ /  ___/  
    / /   |  | |  ||  |_|  | | |     | | | |___  | |___   
   / /_   |  |_|  ||   _   | | |     | | \\___  \\ \\___  \\  
  /____|   \\___,_/ |__| |__| \\_|     |_| /_____/ /_____/  
`}
                </pre>
                <div className="text-sm mb-4">Created with ❤️ by</div>
                <a 
                  href="https://github.com/zyxciss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-game-accent hover:text-game-accent/80 transition-colors"
                >
                  @zyxciss
                </a>
                <div className="mt-4 text-xs text-game-muted">ASCII Art by atah alam</div>
                <div className="mt-6 text-xs text-game-muted">Click anywhere to close</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Index;
