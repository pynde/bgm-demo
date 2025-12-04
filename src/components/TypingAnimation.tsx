import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface TypingAnimationProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    className?: string;
}

export const TypingAnimation = ({
    words,
    typingSpeed = 150,
    deletingSpeed = 100,
    pauseDuration = 3000,
    className
}: TypingAnimationProps) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];

        let timer: NodeJS.Timeout;

        if (!isDeleting && currentText === word) {
            // Finished typing, wait before deleting
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, pauseDuration);
        } else if (isDeleting && currentText === '') {
            // Finished deleting, switch to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
            // Typing or deleting
            timer = setTimeout(() => {
                const nextText = isDeleting
                    ? word.substring(0, currentText.length - 1)
                    : word.substring(0, currentText.length + 1);
                setCurrentText(nextText);
            }, isDeleting ? deletingSpeed : typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={clsx("inline-flex items-center text-3xl animate-yellow-glow", className)}>
            <span className='opacity-0'>I</span>
            <span>{currentText}</span>
        </span>
    );
};
