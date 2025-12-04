import { PlayerInfo } from './PlayerInfo';
import { useTheme } from '../contexts/ThemeContext';
import clsx from 'clsx';

type PlayerImage = { url: string, bgSize: string, bgPosition: string, bgRepeat: string }

export function LeftPanel() {
  const { getBackgroundImage, selectedTheme } = useTheme();
  const bgImage = getBackgroundImage('left');

  const getPlayerImages = (): PlayerImage[] => {
    switch(selectedTheme) {
      case 'bird': return [
        {url: '/gpt_lintu_player_1.png', bgSize: 'cover', bgPosition: 'center top -4rem', bgRepeat: 'bg-no-repeat' },  
        {url: '/gpt_lintu_player_2.png', bgSize: 'cover', bgPosition: 'center top -4rem', bgRepeat: 'bg-no-repeat' }, 
        {url: '/gpt_lintu_player_3.png', bgSize: 'cover', bgPosition: 'center top -4rem', bgRepeat: 'bg-no-repeat' } 
      ];
      case 'war': return [
        {url: '/canva_sota_player_1.png', bgSize: 'cover', bgPosition: 'center top 10%', bgRepeat: 'bg-no-repeat' },  
        {url: '/canva_sota_player_2.png', bgSize: 'cover', bgPosition: 'center top 10%', bgRepeat: 'bg-no-repeat' }, 
        {url: '/canva_sota_player_3.png', bgSize: 'cover', bgPosition: 'center top 10%', bgRepeat: 'bg-no-repeat' }
      ]
      case 'scifi': return [        
        {url: '/canva_scifi_player_1.png', bgSize: 'cover', bgPosition: 'center top 20%', bgRepeat: 'bg-no-repeat' },  
        {url: '/canva_scifi_player_2.png', bgSize: 'cover', bgPosition: 'center top 20%', bgRepeat: 'bg-no-repeat' }, 
        {url: '/canva_scifi_player_3.png', bgSize: 'cover', bgPosition: 'center top 20%', bgRepeat: 'bg-no-repeat' } 
      ]
      default: return [];
    }
  }

  return (
    <div 
      key={bgImage} 
      style={ bgImage ? {"--bgurl": `url(${bgImage})`} as React.CSSProperties : undefined}
      className={
          clsx(
          "w-80 min-w-[320px] p-2 h-full flex flex-col gap-4 relative animate-fade-right animate-duration-500 animate-delay-50 animate-ease-in",
         `after:content-normal after:-z-1 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:mask-(--bgurl) after:mask-size-[120%] after:mask-bottom after:mask-no-repeat after:bg-black/70 after:bg-cover after:bg-center`)
        }
      
    >
        { getPlayerImages().map(item =>         
          <PlayerInfo 
          className='bg-blend-color-burn bg-no-repeat bg-(image:--imgUrl) bg-size-(--bgSize) bg-position-(--bgPosition)'
          style={{ "--imgUrl": `url(${item.url})`, "--bgPosition": item.bgPosition, "--bgSize": item.bgSize } as React.CSSProperties }
        />
        ) }

    </div>
  );
}