
import { motion } from "framer-motion";
import { Award } from "lucide-react";

type ScoreBoardProps = {
  scores: {
    X: number;
    O: number;
  };
  currentPlayer: "X" | "O";
};

export const ScoreBoard = ({ scores, currentPlayer }: ScoreBoardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-8 mb-8"
    >
      <div className={`text-center ${currentPlayer === "X" ? "scale-110 transition-transform" : ""}`}>
        <div className="text-sm font-medium text-game-accent mb-1">Player X</div>
        <div className="text-3xl font-bold text-game-secondary">{scores.X}</div>
      </div>
      <Award className="w-6 h-6 text-game-muted" />
      <div className={`text-center ${currentPlayer === "O" ? "scale-110 transition-transform" : ""}`}>
        <div className="text-sm font-medium text-game-secondary mb-1">Player O</div>
        <div className="text-3xl font-bold text-game-secondary">{scores.O}</div>
      </div>
    </motion.div>
  );
};
