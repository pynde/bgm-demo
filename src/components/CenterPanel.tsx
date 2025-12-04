import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { Button } from './ui/button';
import { LayoutGrid, Layers, Map, Package, Fullscreen } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { Outlet } from '@tanstack/react-router';

export function CenterPanel() {
  const { getBackgroundImage, getBackgroundColor, selectedTheme } = useTheme();
  const bgImage = getBackgroundImage('center');

  // Use themed background if available, otherwise use default
  const displayImage = bgImage;

  const [activeArea, setActiveArea] = useState<'board' | 'deck' | 'battlefield' | 'inventory'>('board');

  const playAreas = [
    { id: 'board' as const, label: 'Game Board', icon: Map },
    { id: 'deck' as const, label: 'Deck', icon: Layers },
    { id: 'battlefield' as const, label: 'Battlefield', icon: LayoutGrid },
    { id: 'inventory' as const, label: 'Inventory', icon: Package },
  ];

  return (
    <Card className="flex-1 mt-6 w-full bg-white/20 overflow-y-auto flex max-w-[60vw] max-h-[80vh] justify-center items-center flex-col gap-4 centerpanel relative">
      <Outlet />
      {/* Navigation Buttons */}
      <div className="flex z-10 gap-2 absolute top-2 justify-center w-full p-2">
        {playAreas.map((area) => {
          const Icon = area.icon;
          return (
            <Button
              key={area.id}
              variant={activeArea === area.id ? 'default' : 'secondary'}
              onClick={() => setActiveArea(area.id)}
              className={`flex items-center gap-2 transition-all duration-200 ${activeArea === area.id
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{area.label}</span>
            </Button>
          );
        })}
        <Button
          variant="outline"
          className="gap-2 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
          onClick={async () => {
            try {
              if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
              } else {
                await document.exitFullscreen();
              }
            } catch (e) {
              console.error('Fullscreen error:', e);
            }
          }}
          aria-label="Toggle fullscreen"
        >
          <Fullscreen className="w-4 h-4" />
        </Button>
      </div>

      {/* Play Area Content */}
      <motion.div
        key={displayImage}
        className={clsx(
          `w-full h-full flex-1 rounded-xl animate-fade-down animate-ease-in-out animate-duration-500 animate-delay-200`,
        )}
      >
        {activeArea === 'board' && (
          <ImageWithFallback
            src={displayImage}
            alt="Game Board"
            className={clsx("transition-all rounded-md duration-700 ease-in-out w-full h-full inset-shadow-blue-500 object-contain")}
          />
        )}

        {activeArea === 'deck' && (
          <div className="w-full h-full bg-slate-900/80 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Layers className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-slate-300 text-xl mb-2">Card Deck</h3>
              <p className="text-slate-400">View and manage your deck of cards</p>
            </div>
          </div>
        )}

        {activeArea === 'battlefield' && (
          <div className="w-full h-full bg-slate-900/80 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <LayoutGrid className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-slate-300 text-xl mb-2">Battlefield</h3>
              <p className="text-slate-400">Strategic combat area</p>
            </div>
          </div>
        )}

        {activeArea === 'inventory' && (
          <div className="w-full h-full bg-slate-900/80 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Package className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-slate-300 text-xl mb-2">Inventory</h3>
              <p className="text-slate-400">Manage your items and resources</p>
            </div>
          </div>
        )}
      </motion.div>
    </Card>
  );
}