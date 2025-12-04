import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Activity, Cpu, Crosshair, Bird } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useTheme } from '../contexts/ThemeContext';

export function RightPanel() {
  const { selectedTheme, getBackgroundImage } = useTheme();
  const bgImage = getBackgroundImage('right');

  const getThemeIcon = () => {
    if (selectedTheme === 'scifi') return Cpu;
    if (selectedTheme === 'war') return Crosshair;
    if (selectedTheme === 'bird') return Bird;
    return Activity;
  };

  const getThemeColors = () => {
    if (selectedTheme === 'scifi') {
      return {
        iconColor: 'text-cyan-400',
        player1From: 'from-cyan-400',
        player1To: 'to-cyan-600',
        player1Bg: 'bg-cyan-400',
        player1Glow: 'bg-cyan-400',
        player2From: 'from-purple-400',
        player2To: 'to-purple-600',
        player2Bg: 'bg-purple-400',
        player2Glow: 'bg-purple-400',
        trackGradient: 'from-cyan-500/20 via-purple-500/20 to-cyan-500/20',
        trackLine: 'from-cyan-400 via-purple-400 to-cyan-400',
      };
    } else if (selectedTheme === 'war') {
      return {
        iconColor: 'text-red-400',
        player1From: 'from-orange-400',
        player1To: 'to-orange-600',
        player1Bg: 'bg-orange-400',
        player1Glow: 'bg-orange-400',
        player2From: 'from-red-400',
        player2To: 'to-red-600',
        player2Bg: 'bg-red-400',
        player2Glow: 'bg-red-400',
        trackGradient: 'from-orange-500/20 via-red-500/20 to-orange-500/20',
        trackLine: 'from-orange-400 via-red-400 to-orange-400',
      };
    } else if (selectedTheme === 'bird') {
      return {
        iconColor: 'text-sky-400',
        player1From: 'from-sky-400',
        player1To: 'to-sky-600',
        player1Bg: 'bg-sky-400',
        player1Glow: 'bg-sky-400',
        player2From: 'from-pink-400',
        player2To: 'to-pink-600',
        player2Bg: 'bg-pink-400',
        player2Glow: 'bg-pink-400',
        trackGradient: 'from-sky-500/20 via-pink-500/20 to-sky-500/20',
        trackLine: 'from-sky-400 via-pink-400 to-sky-400',
      };
    }
    
    // Default
    return {
      iconColor: 'text-blue-400',
      player1From: 'from-blue-400',
      player1To: 'to-blue-600',
      player1Bg: 'bg-blue-400',
      player1Glow: 'bg-blue-400',
      player2From: 'from-red-400',
      player2To: 'to-red-600',
      player2Bg: 'bg-red-400',
      player2Glow: 'bg-red-400',
      trackGradient: 'from-blue-500/20 via-purple-500/20 to-red-500/20',
      trackLine: 'from-blue-400 via-purple-400 to-red-400',
    };
  };

  const ThemeIcon = getThemeIcon();
  const colors = getThemeColors();

  return (
    <div key={selectedTheme} className="w-80 animate-fade-left animate-ease-in animate-duration-500 animate-delay-50 flex ml-auto flex-col gap-4 relative">
      {bgImage && (
        <div 
          className="absolute inset-0 rounded-xl bg-cover bg-center opacity-20 -z-10 animate-fade animate-ease-in animate-duration-400 animate-delay-200"
        />
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 cursor-pointer hover:border-slate-600 px-4 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 ml-2 mt-2">
                <ThemeIcon className={`w-6 h-6 ${colors.iconColor}`} />
                <span className="text-slate-300">Score Track</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {/* Compact Score Display */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 bg-gradient-to-br ${colors.player1From} ${colors.player1To} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-xs">P1</span>
                    </div>
                    <span className="text-slate-300">Player 1</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-slate-800 to-slate-700 text-white border-slate-600">
                    65
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 bg-gradient-to-br ${colors.player2From} ${colors.player2To} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-xs">P2</span>
                    </div>
                    <span className="text-slate-300">Player 2</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-slate-800 to-slate-700 text-white border-slate-600">
                    45
                  </Badge>
                </div>
              </div>
              
              <p className="text-slate-400 text-xs text-center mt-4">Click to view full track</p>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="max-w-2xl bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-slate-300">
              <ThemeIcon className={`w-6 h-6 ${colors.iconColor}`} />
              Score Track
            </DialogTitle>
          </DialogHeader>

          {/* Full Vertical Track */}
          <div className="relative bg-gradient-to-b from-slate-900/80 to-slate-800/80 rounded-xl p-6 h-96 border border-slate-700/50">
            {/* Track Line with gradient */}
            <div className={`absolute left-1/2 top-8 bottom-8 w-3 bg-gradient-to-b ${colors.trackGradient} rounded-full -translate-x-1/2 shadow-inner`} />
            <div className={`absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b ${colors.trackLine} rounded-full -translate-x-1/2`} />
            
            {/* Score Markers */}
            {[0, 25, 50, 75, 100].map((score, index) => (
              <div
                key={score}
                className="absolute left-1/2 -translate-x-1/2 flex items-center gap-5"
                style={{ top: `${8 + (index * 20)}%` }}
              >
                <span className="text-slate-300 text-sm w-8 text-right mr-2">{score}</span>
                <div className="w-5 h-5 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full border-2 border-slate-600 shadow-lg" />
              </div>
            ))}
            
            {/* Player 1 Marker */}
            <div
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-500 z-10"
              style={{ top: '35%' }}
            >
              <div className="relative">
                <div className={`absolute inset-0 ${colors.player1Glow} rounded-full blur-md opacity-50 animate-pulse`} />
                <div className={`relative w-10 h-10 bg-gradient-to-br ${colors.player1From} ${colors.player1To} rounded-full border-4 border-slate-800 shadow-xl flex items-center justify-center`}>
                  <span className="text-white">P1</span>
                </div>
                <Badge className="absolute -right-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-800 to-slate-700 text-white whitespace-nowrap border-slate-600">
                  Score: 65
                </Badge>
              </div>
            </div>
            
            {/* Player 2 Marker */}
            <div
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-500 z-10"
              style={{ top: '55%' }}
            >
              <div className="relative">
                <div className={`absolute inset-0 ${colors.player2Glow} rounded-full blur-md opacity-50 animate-pulse`} />
                <div className={`relative w-10 h-10 bg-gradient-to-br ${colors.player2From} ${colors.player2To} rounded-full border-4 border-slate-800 shadow-xl flex items-center justify-center`}>
                  <span className="text-white">P2</span>
                </div>
                <Badge className="absolute -right-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-800 to-slate-700 text-white whitespace-nowrap border-slate-600">
                  Score: 45
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="my-4 bg-slate-700" />

          {/* Track Legend */}
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 ${colors.player1Bg} rounded-full`} />
              <span className="text-slate-300 text-sm">Player 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 ${colors.player2Bg} rounded-full`} />
              <span className="text-slate-300 text-sm">Player 2</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}