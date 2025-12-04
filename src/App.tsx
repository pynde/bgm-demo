import { LeftPanel } from "./components/LeftPanel";
import { CenterPanel } from "./components/CenterPanel";

import { RightPanel } from "./components/RightPanel";
import { useTheme } from "./contexts/ThemeContext";
import clsx from "clsx";
import { Suspense } from "react";

import { BackgroundAnimation } from "./components/BackgroundAnimation";

export default function App() {
  const theme = useTheme();

  return (
    <div className={clsx(theme.getBackgroundColor(), `dark p-0 m-0 min-h-screen relative`)}>
      {/* <img src={getBackgroundImage("bgimage")} key={getBackgroundImage("bgimage")} className={clsx(`animate-fade ease-in-out animate-duration-1000 animate-delay-100 blur-xs absolute top-0 left-0 w-full h-full object-cover mix-blend-color-burn`)} /> */}
      <BackgroundAnimation />
      {/* Main Content */}
      <div className="transition-all duration-700 pt-2 ease-in-out h-screen max-h-screen px-6 flex gap-6 relative overflow-hidden">
        {/* Left Panel - Player Info */}
        <LeftPanel />
        {/* Center Area - Game Board */}
        <div className="flex flex-col justify-start items-center flex-1">
          <CenterPanel />
        </div>
        {/* Right Panel - Gauge/Indicator */}
        <RightPanel />
      </div>
    </div>
  );
}