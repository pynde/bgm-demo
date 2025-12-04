import { Canvas } from '@react-three/fiber'
import { useTheme } from '../contexts/ThemeContext'
import { ScifiAnimation } from './animations/ScifiAnimation'
import { WarAnimation } from './animations/WarAnimation'
import { BirdAnimation } from './animations/BirdAnimation'
import { Suspense } from 'react'

export function BackgroundAnimation() {
    const { selectedTheme } = useTheme()

    if (!selectedTheme) return null

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                    {selectedTheme === 'scifi' && <ScifiAnimation />}
                    {selectedTheme === 'war' && <WarAnimation />}
                    {selectedTheme === 'bird' && <BirdAnimation />}
                </Suspense>
            </Canvas>
        </div>
    )
}
