import {
  User,
  Coins,
  Gem,
  Zap,
  Heart,
  Shield,
  Sword,
  Cpu,
  Battery,
  Sparkles,
  Target,
  Crosshair,
  Flame,
  Bird,
  Feather,
  Wind,
  Bot,
  Medal,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useTheme } from "../contexts/ThemeContext";
import { FC } from "react";
import type { HTMLAttributes } from "react";
import clsx from "clsx";


export type PlayerInfoProps = HTMLAttributes<HTMLDivElement>;


export const PlayerInfo: FC<PlayerInfoProps> = (props: PlayerInfoProps) => {
  const { selectedTheme } = useTheme();

  // Define themed resources
  const getThemedResources = () => {
    if (selectedTheme === "scifi") {
      return [
        {
          icon: Cpu,
          label: "Circuits",
          value: 1250,
          color: "text-cyan-400",
        },
        {
          icon: Battery,
          label: "Power",
          value: 45,
          color: "text-blue-400",
        },
        {
          icon: Zap,
          label: "Energy",
          value: 85,
          color: "text-purple-400",
        },
        {
          icon: Sparkles,
          label: "Shields",
          value: 100,
          color: "text-teal-400",
        },
        {
          icon: Target,
          label: "Defense",
          value: 68,
          color: "text-indigo-400",
        },
        {
          icon: Bot,
          label: "Attack",
          value: 92,
          color: "text-violet-400",
        },
      ];
    } else if (selectedTheme === "war") {
      return [
        {
          icon: Coins,
          label: "Gold",
          value: 1250,
          color: "text-yellow-400",
        },
        {
          icon: Medal,
          label: "Honor",
          value: 45,
          color: "text-amber-400",
        },
        {
          icon: Flame,
          label: "Morale",
          value: 85,
          color: "text-orange-400",
        },
        {
          icon: Heart,
          label: "Health",
          value: 100,
          color: "text-red-400",
        },
        {
          icon: Shield,
          label: "Defense",
          value: 68,
          color: "text-gray-400",
        },
        {
          icon: Crosshair,
          label: "Attack",
          value: 92,
          color: "text-red-500",
        },
      ];
    } else if (selectedTheme === "bird") {
      return [
        {
          icon: Feather,
          label: "Feathers",
          value: 1250,
          color: "text-sky-400",
        },
        {
          icon: Sparkles,
          label: "Magic",
          value: 45,
          color: "text-pink-400",
        },
        {
          icon: Wind,
          label: "Winds",
          value: 85,
          color: "text-blue-300",
        },
        {
          icon: Heart,
          label: "Life",
          value: 100,
          color: "text-rose-400",
        },
        {
          icon: Bird,
          label: "Agility",
          value: 68,
          color: "text-cyan-300",
        },
        {
          icon: Zap,
          label: "Speed",
          value: 92,
          color: "text-yellow-300",
        },
      ];
    }

    // Default theme
    return [
      {
        icon: Coins,
        label: "Gold",
        value: 1250,
        color: "text-yellow-400",
      },
      {
        icon: Gem,
        label: "Gems",
        value: 45,
        color: "text-purple-400",
      },
      {
        icon: Zap,
        label: "Energy",
        value: 85,
        color: "text-blue-400",
      },
      {
        icon: Heart,
        label: "Health",
        value: 100,
        color: "text-red-400",
      },
      {
        icon: Shield,
        label: "Defense",
        value: 68,
        color: "text-cyan-400",
      },
      {
        icon: Sword,
        label: "Attack",
        value: 92,
        color: "text-orange-400",
      },
    ];
  };

  const getAvatarIcon = () => {
    if (selectedTheme === "scifi") return Cpu;
    if (selectedTheme === "war") return Crosshair;
    if (selectedTheme === "bird") return Bird;
    return User;
  };

  const getAvatarGradient = () => {
    if (selectedTheme === "scifi") return "from-cyan-500/80 to-purple-500";
    if (selectedTheme === "war") return "from-red-500/80 to-orange-500";
    if (selectedTheme === "bird") return "from-sky-500/80 to-pink-500";
    return "from-blue-500 to-purple-500";
  };

  const getPlayerClass = () => {
    if (selectedTheme === "scifi") return "Level 24";
    if (selectedTheme === "war") return "Level 24";
    if (selectedTheme === "bird") return "Level 24";
    return "Level 24 • Warrior";
  };

  const resources = getThemedResources();
  const AvatarIcon = getAvatarIcon();

  const getCardBackground = () => {
    if (selectedTheme === "scifi") return "bg-cyan-500 border-cyan-500/30";
    if (selectedTheme === "war") return "bg-red-800 border-red-500/30";
    if (selectedTheme === "bird") return "bg-sky-500 border-sky-500/30";
    return "bg-slate-800/50 border-slate-700";
  };

  return (
    <Card
      {...props}
      className={clsx(`min-h-[200px] justify-center px-4 gap-2 transition-all duration-500 ${getCardBackground()}`, props.className)}
    >
      <CardHeader className="pb-0 mb-0">
      {/* Player Header */}
      <div className="flex items-center gap-1">
        <Avatar className="w-8 h-8">
        <AvatarFallback
          className={`bg-linear-to-br ${getAvatarGradient()}`}
        >
          <AvatarIcon className="w-8 h-8 p-1 text-white mix-blend-difference" />
        </AvatarFallback>
        </Avatar>
        <div>
        <h2 className="text-white font-bold mix-blend-screen text-md">
          Player Name
        </h2>
        {/* <p className="text-slate-400">{getPlayerClass()}</p> */}
        </div>
      </div>
      </CardHeader>

      <Separator className="bg-slate-700 my-1" />

      <CardContent className="pt-0">
      {/* Resources */}
      <div className="grid grid-cols-3 gap-4 items-center">
        {resources.map((resource) => {
        const Icon = resource.icon;
        return (
          <div
          key={resource.label}
          className="flex items-center gap-2 justify-center"
          >
          <Icon className={`w-5 h-5 ${resource.color}`} />
          <span className="text-white">
            {resource.value}
          </span>
          </div>
        );
        })}
      </div>
      </CardContent>
    </Card>
  );
}