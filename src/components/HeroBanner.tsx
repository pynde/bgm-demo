import clsx from "clsx"
import { FC } from "react"
import { TypingAnimation } from "./TypingAnimation";

export const HeroBanner: FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={clsx(className, "absolute font-normal text-white transition-all inset-0 flex flex-col items-center justify-center gap-12")}>
            {/* Element 1: Title */}
            <h1 className="text-4xl md:text-6xl font-pixel text-center leading-relaxed">
                Board Game Maker
            </h1>

            {/* Element 2: Subtitle */}
            <p className="text-sm md:text-xl font-pixel uppercase text-center leading-relaxed">
                <TypingAnimation words={["Create", "Play", "Publish"]} />{" "}
                your board game
            </p>
        </div>
    );
};
