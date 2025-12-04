import { HeroBanner } from '@/components/HeroBanner';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext'

export const Route = createFileRoute('/')({
  component: AppRoot,
});

export default function AppRoot() {
  const { setSelectedTheme } = useTheme()

  useEffect(() => {
    setSelectedTheme('scifi')
  }, [])

  return (<HeroBanner className='z-2' />)
}