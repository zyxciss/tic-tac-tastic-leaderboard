
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

type GameStatusProps = {
  winner: string | null;
  isDraw: boolean;
  onPlayAgain: () => void;
};

export const GameStatus = ({ winner, isDraw, onPlayAgain }: GameStatusProps) => {
  if (!winner && !isDraw) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center"
      >
        <h2 className="text-2xl font-bold text-game-secondary mb-4">
          {isDraw ? "It's a Draw!" : `Player ${winner} Wins!`}
        </h2>
        <button
          onClick={onPlayAgain}
          className="flex items-center gap-2 px-6 py-3 bg-game-secondary text-white rounded-lg hover:bg-game-secondary/90 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Play Again
        </button>
      </motion.div>
    </motion.div>
  );
};
