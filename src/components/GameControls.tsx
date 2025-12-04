import { RotateCcw, Undo2, Info } from 'lucide-react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface GameControlsProps {
  onReset: () => void;
  onUndo: () => void;
  moveCount: number;
}

export function GameControls({ onReset, onUndo, moveCount }: GameControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              onClick={onUndo}
              disabled={moveCount === 0}
              className="flex-1 bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
            >
              <Undo2 className="w-5 h-5 mr-2" />
              Undo
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo last move</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
            >
              <Info className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="max-w-xs">
              <p className="mb-2">How to Play:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Click a cell to select it</li>
                <li>Click an adjacent cell to place your piece</li>
                <li>Capture opponent pieces by placing next to them</li>
                <li>Player with most pieces wins!</li>
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              onClick={onReset}
              className="flex-1 bg-red-900/50 border-red-700 hover:bg-red-800 text-white"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Start a new game</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
