import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cloud } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function MovingCloud({ position, speed, ...props }: any) {
    const group = useRef<THREE.Group>(null)

    useFrame((_state, delta) => {
        if (group.current) {
            group.current.position.x += speed * delta
            // Reset position when it goes off screen. 
            // Camera at 0,0,5, fov 75. Visible width at z=-10 is approx 30 units.
            // Cloud bounds are 10 units wide. 
            // x > 25 ensures it's fully offscreen even at depth.
            if (group.current.position.x > 25) {
                group.current.position.x = -25
            }
        }
    })

    return (
        <group ref={group} position={position}>
            <Cloud {...props} />
        </group>
    )
}

export function BirdAnimation() {
    return (
        <>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#fffbeb" />

            {/* Sun - using scale to ensure it's perfectly round */}
            <mesh position={[20, 5, -15]} scale={[1, 1, 1]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="#FDB813"
                    emissive="#FDB813"
                    emissiveIntensity={300}
                    toneMapped={false}
                />
            </mesh>

            <MovingCloud speed={0.3} position={[-4, 0, 0]} opacity={0.7} segments={20} bounds={[10, 2, 2]} volume={6} color="white" />
            <MovingCloud speed={0.2} position={[0, 0, -5]} opacity={0.5} seed={1} segments={20} bounds={[10, 2, 2]} volume={10} color="#f0f9ff" />
            <MovingCloud speed={0.1} position={[5, 2, -2]} opacity={0.6} seed={2} segments={20} bounds={[10, 2, 2]} volume={8} color="white" />
            <MovingCloud speed={0.05} position={[-8, -2, -8]} opacity={0.5} seed={3} segments={20} bounds={[10, 2, 2]} volume={8} color="#f0f9ff" />

            {/* Bloom effect for the sun */}
            <EffectComposer>
                <Bloom
                    intensity={0.9}
                    luminanceThreshold={0.6}
                    luminanceSmoothing={0.05}
                    kernelSize={3}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    )
}
