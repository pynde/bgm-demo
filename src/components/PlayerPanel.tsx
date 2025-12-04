import { motion } from 'motion/react';
import { Trophy, User } from 'lucide-react';

interface PlayerPanelProps {
  player: 'player1' | 'player2';
  score: number;
  isActive: boolean;
  playerName: string;
  color: string;
}

export function PlayerPanel({ player, score, isActive, playerName, color }: PlayerPanelProps) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.02 : 1,
        opacity: isActive ? 1 : 0.7,
      }}
      className={`
        bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border-2
        ${isActive ? 'border-yellow-400 shadow-xl shadow-yellow-400/20' : 'border-slate-700'}
        transition-all duration-300
      `}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <div
            className={`
              w-24 h-24 rounded-full ${color} flex items-center justify-center
              shadow-lg
            `}
          >
            <User className="w-12 h-12 text-white" />
          </div>
          {isActive && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 border-4 border-yellow-400 border-t-transparent rounded-full"
            />
          )}
        </div>

        {/* Player Name */}
        <div className="text-center">
          <h2 className="text-white text-2xl mb-1">{playerName}</h2>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-yellow-400 text-sm"
            >
              Your Turn
            </motion.div>
          )}
        </div>

        {/* Score */}
        <div className="bg-slate-900/50 rounded-xl p-6 w-full">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-slate-400">Score</span>
          </div>
          <div className="text-center text-4xl text-white">{score}</div>
        </div>

        {/* Stats */}
        <div className="w-full space-y-3">
          <div className="bg-slate-900/30 rounded-lg p-3 flex justify-between">
            <span className="text-slate-400">Pieces</span>
            <span className="text-white">{score}</span>
          </div>
          <div className="bg-slate-900/30 rounded-lg p-3 flex justify-between">
            <span className="text-slate-400">Status</span>
            <span className={isActive ? 'text-green-400' : 'text-slate-400'}>
              {isActive ? 'Active' : 'Waiting'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
