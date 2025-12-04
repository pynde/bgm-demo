import { motion } from 'motion/react';

type Player = 'player1' | 'player2';

interface GameBoardProps {
  board: (Player | null)[][];
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  currentPlayer: Player;
}

export function GameBoard({ board, selectedCell, onCellClick, currentPlayer }: GameBoardProps) {
  const getPieceColor = (player: Player) => {
    return player === 'player1' ? 'bg-blue-500' : 'bg-red-500';
  };

  const isValidMove = (row: number, col: number) => {
    if (!selectedCell || board[row][col] !== null) return false;
    const rowDiff = Math.abs(selectedCell.row - row);
    const colDiff = Math.abs(selectedCell.col - col);
    return rowDiff <= 1 && colDiff <= 1;
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700">
      <div className="grid grid-cols-8 gap-1 bg-slate-900 p-2 rounded-xl">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const isValid = isValidMove(rowIndex, colIndex);
            const isDark = (rowIndex + colIndex) % 2 === 1;

            return (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
                className={`
                  w-16 h-16 rounded-lg relative transition-all
                  ${isDark ? 'bg-slate-700' : 'bg-slate-600'}
                  ${isSelected ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-slate-900' : ''}
                  ${isValid ? 'ring-2 ring-green-400 ring-offset-1 ring-offset-slate-900' : ''}
                  hover:brightness-110
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cell && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`
                      absolute inset-2 rounded-full ${getPieceColor(cell)}
                      shadow-lg
                    `}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                  </motion.div>
                )}
                
                {isValid && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    className={`
                      absolute inset-4 rounded-full
                      ${currentPlayer === 'player1' ? 'bg-blue-400' : 'bg-red-400'}
                    `}
                  />
                )}
              </motion.button>
            );
          })
        )}
      </div>
    </div>
  );
}
