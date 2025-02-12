
import { X, Circle } from "lucide-react";
import { motion } from "framer-motion";

type Cell = "X" | "O" | null;
type GameBoardProps = {
  board: Cell[];
  onCellClick: (index: number) => void;
  winningCombination: number[] | null;
};

export const GameBoard = ({ board, onCellClick, winningCombination }: GameBoardProps) => {
  const renderCell = (index: number) => {
    const isWinningCell = winningCombination?.includes(index);
    const content = board[index];

    return (
      <motion.button
        key={index}
        whileHover={{ scale: content ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`h-24 w-24 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg transition-colors
          ${!content && "hover:bg-white/40"}
          ${isWinningCell && "bg-game-success/20"}
        `}
        onClick={() => !content && onCellClick(index)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {content && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {content === "X" ? (
              <X className="w-12 h-12 text-game-accent" />
            ) : (
              <Circle className="w-12 h-12 text-game-secondary" />
            )}
          </motion.div>
        )}
      </motion.button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
      {board.map((_, index) => renderCell(index))}
    </div>
  );
};
