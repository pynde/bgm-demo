import { PlayerInfo } from './PlayerInfo';
import { useTheme } from '../contexts/ThemeContext';
import clsx from 'clsx';
import { ImageWithFallback } from './figma/ImageWithFallback';


export function LeftPanel() {
  const { getBackgroundImage, selectedTheme } = useTheme();
  const bgImage = getBackgroundImage('left');

  const getPlayerImages = (): React.ImgHTMLAttributes<HTMLImageElement>[] => {
    switch (selectedTheme) {
      case 'bird': return [
        { src: '/gpt_lintu_player_1_resized_512x768.webp', className: 'object-[50%_-3rem]' },
        { src: '/gpt_lintu_player_2_resized_512x768.webp', className: 'object-[50%_-3rem]' },
        { src: '/gpt_lintu_player_3_resized_512x768.webp', className: 'object-[50%_-3rem]' }
      ];
      case 'war': return [
        { src: '/canva_sota_player_1_resized_540x540.webp', className: 'object-[50%_10%]' },
        { src: '/canva_sota_player_2_resized_540x540.webp', className: 'object-[50%_10%]' },
        { src: '/canva_sota_player_3_resized_540x540.webp', className: 'object-[50%_10%]' }
      ]
      case 'scifi': return [
        { src: '/canva_scifi_player_1_resized_540x540.webp', className: 'object-[50%_20%]' },
        { src: '/canva_scifi_player_2_resized_540x540.webp', className: 'object-[50%_20%]' },
        { src: '/canva_scifi_player_3_resized_540x540.webp', className: 'object-[50%_20%]' }
      ]
      default: return [];
    }
  }

  return (
    <div
      key={bgImage}
      className={
        clsx(
          "w-80 min-w-[320px] p-2 h-full flex flex-col gap-4 relative animate-fade-right animate-duration-500 animate-delay-50 animate-ease-in")
      }
    >
      {getPlayerImages().map(item =>
        <PlayerInfo
          bgImage={
            <ImageWithFallback
              className={clsx('w-full h-full absolute inset-0 object-cover mix-blend-color-burn transition-opacity duration-500', item.className)}
              src={item.src}
            />
          }
        />
      )}
    </div>
  );
}