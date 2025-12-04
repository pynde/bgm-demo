import { createContext, useContext, useState, ReactNode } from 'react';

export type CardTheme = "scifi" | "war" | "bird" | null;

export type ThemeContextType = {
  selectedTheme: CardTheme;
  setSelectedTheme: (theme: CardTheme) => void;
  setSelectedThemeOnDelay: (theme: CardTheme, delayInMs?: number) => void;
  getBackgroundImage: (panel: 'left' | 'center' | 'right' | 'bgimage') => string | undefined;
  getBackgroundColor: () => string | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeBackgrounds = {
  scifi: {
    left: 'https://images.unsplash.com/photo-1761078739233-629de9252840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBjaXJjdWl0fGVufDF8fHx8MTc2MzAzOTE5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    center: 'https://images.unsplash.com/photo-1685910715615-577928e2450e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBmdXR1cmlzdGljJTIwc3BhY2V8ZW58MXx8fHwxNzYzMDAwODY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    right: 'https://images.unsplash.com/photo-1761078739233-629de9252840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBjaXJjdWl0fGVufDF8fHx8MTc2MzAzOTE5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgimage: '',
    bg: 'bg-blue-800 bg-gradient-to-b from-slate-900 to-slate-800', // darkish blue
  },
  war: {
    left: '/canva_left_panel_sota.png',
    center: 'sota.png',
    right: 'https://images.unsplash.com/photo-1632214701833-55189812d379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGNhc3RsZSUyMHdhcnxlbnwxfHx8fDE3NjMwMzkxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgimage: 'canva_left_panel_sota.png',
    bg: 'bg-red-800 bg-gradient-to-b from-red-900 to-red-800', // dark red
  },
  bird: {
    left: '/testi_lintu.png',
    center: 'https://images.unsplash.com/photo-1665570843537-ca19f87292d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwc2t5JTIwY2xvdWRzfGVufDF8fHx8MTc2MzAzOTE5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    right: 'https://images.unsplash.com/photo-1623811658140-a4276efa6f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZWF0aGVycyUyMG5hdHVyZSUyMGJpcmRzfGVufDF8fHx8MTc2MzAzOTE5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgimage: 'https://images.unsplash.com/photo-1665570843537-ca19f87292d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwc2t5JTIwY2xvdWRzfGVufDF8fHx8MTc2MzAzOTE5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bg: 'bg-white bg-gradient-to-b from-white to-indigo-200', // white with light blue
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>(null);

  const getBackgroundImage = (panel: 'left' | 'center' | 'right' | 'bgimage'): string | undefined => {
    if (!selectedTheme) return undefined;
    return themeBackgrounds[selectedTheme][panel];
  };

  const setSelectedThemeOnDelay = (theme: CardTheme, delayInMs?: number) => {
    setTimeout(() => {
      setSelectedTheme(theme);
    }, delayInMs || 300);
  }

  const getBackgroundColor = () => {
    if (!selectedTheme) return null;
    return themeBackgrounds[selectedTheme]['bg']
  }

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme, getBackgroundImage, getBackgroundColor, setSelectedThemeOnDelay }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
