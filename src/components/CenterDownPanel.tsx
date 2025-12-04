import { Card, CardContent } from "./ui/card";
import { GameCard } from "./GameCard";
import { ScrollArea } from "./ui/scroll-area";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "@tanstack/react-router";

export function CenterDownPanel(props: React.HTMLAttributes<HTMLDivElement>) {
  const { setSelectedTheme, selectedTheme } = useTheme();
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "What",
      route: "/",
      cost: 3,
      damage: 25,
      type: "Attack",
      description: "High-tech energy weapon",
      rarity: "rare",
      theme: "scifi" as const,
      imageUrl: "https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjI5NzkzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      title: "Why",
      route: "/why",
      cost: 2,
      damage: 0,
      type: "Defense",
      description: "Inspire troops for victory",
      rarity: "common",
      theme: "war" as const,
      imageUrl: "https://images.unsplash.com/photo-1571844117932-ead3aec4c606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXIlMjBtaWxpdGFyeSUyMGJhdHRsZXxlbnwxfHx8fDE3NjI5NzkzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      title: "How",
      route: "/how",
      cost: 2,
      damage: 0,
      type: "Support",
      description: "Soar above the battlefield",
      rarity: "common",
      theme: "bird" as const,
      imageUrl: "https://images.unsplash.com/photo-1634114160518-a93bca61e32d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwZmx5aW5nJTIwd2luZ3N8ZW58MXx8fHwxNzYyOTY0NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <CardContent {...props}>
      <div className="flex h-full gap-2 justify-center">
        {cards.map((card) => (
          <GameCard
            key={card.id}
            card={card}
            onClick={() => {
              setSelectedTheme(card.theme);
              navigate({ to: card.route });
            }}
            isSelected={selectedTheme === card.theme}
          />
        ))}
      </div>
    </CardContent>
  );
}