import { motion } from 'motion/react';
import { Zap, Shield, Heart, Sword, Cpu, Crosshair, Bird } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CardProps {
  card: {
    id: number;
    title: string;
    cost: number;
    damage: number;
    type: string;
    description: string;
    rarity: string;
    theme?: 'scifi' | 'war' | 'bird';
    imageUrl?: string;
  };
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isSelected?: boolean;
}

export function GameCard({ card, onClick, onMouseEnter, onMouseLeave, isSelected }: CardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-slate-600 to-slate-700';
      case 'rare':
        return 'from-blue-600 to-blue-700';
      case 'epic':
        return 'from-purple-600 to-purple-700';
      case 'legendary':
        return 'from-amber-600 to-amber-700';
      default:
        return 'from-slate-600 to-slate-700';
    }
  };

  const getThemeIcon = (theme?: string) => {
    switch (theme) {
      case 'scifi':
        return Cpu;
      case 'war':
        return Crosshair;
      case 'bird':
        return Bird;
      default:
        return getTypeIcon(card.type);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Attack':
        return Sword;
      case 'Defense':
        return Shield;
      case 'Support':
        return Heart;
      default:
        return Zap;
    }
  };

  const Icon = getThemeIcon(card.theme);

  return (
    <div className="relative h-full inline-block group">
      <motion.div
        whileHover={{ y: -20, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={`w-40 h-56 rounded-xl bg-gradient-to-br ${getRarityColor(
            card.rarity
          )} p-0.5 shadow-lg ${isSelected ? 'ring-4 ring-yellow-400' : ''}`}
        >
          <div className="w-full h-full bg-slate-900 rounded-xl p-3 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-1">
                <Icon className="w-4 h-4 text-slate-300" />
              </div>
              <Badge className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center p-0">
                <span className="text-white text-sm">{card.cost}</span>
              </Badge>
            </div>

            {/* Card Art */}
            <div className="flex-1 bg-slate-800 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
              {card.imageUrl ? (
                <ImageWithFallback
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  key={card.id + ''}
                />
              ) : (
                <Icon className="w-12 h-12 text-slate-600" />
              )}
            </div>

            <Separator className="mb-2 bg-slate-700" />

            {/* Card Info */}
            <div className="text-center">
              <h4 className="text-white text-sm mb-1">{card.title}</h4>
              <p className="text-slate-400 text-xs leading-tight">{card.description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}