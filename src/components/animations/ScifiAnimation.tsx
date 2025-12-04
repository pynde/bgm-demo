import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Cloud } from '@react-three/drei'
import * as THREE from 'three'

interface PlanetProps {
    position: [number, number, number]
    size: number
    color: string
    speed: number
    textureUrl?: string
    emissive?: string
    emissiveIntensity?: number
}

function Planet({ position, size, color, speed, textureUrl, emissive, emissiveIntensity = 0 }: PlanetProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const texture = textureUrl ? useLoader(THREE.TextureLoader, textureUrl) : null;

    useFrame((_state, delta) => {
        if (meshRef.current) {
            // Very slow rotation - barely visible
            meshRef.current.rotation.y += delta * 0.005

            // Extremely slow parallax movement
            meshRef.current.position.x += speed * delta

            // Loop back when off screen
            if (meshRef.current.position.x > 30) {
                meshRef.current.position.x = -30
            }
        }
    })

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial
                map={texture}
                color={color}
                emissive={emissive || color}
                emissiveIntensity={emissiveIntensity}
                roughness={0.8}
                metalness={0.2}
            />
        </mesh>
    )
}

function Star({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const twinkleOffset = useMemo(() => Math.random() * Math.PI * 2, [])


    useFrame((state) => {
        if (meshRef.current) {
            // Subtle twinkling
            const material = meshRef.current.material as THREE.MeshStandardMaterial
            material.emissiveIntensity = 8 + Math.sin(state.clock.elapsedTime * 2 + twinkleOffset) * 2
        }
    })

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={8}
                toneMapped={false}
            />
        </mesh>
    )
}

export function ScifiAnimation() {
    const planets: PlanetProps[] = useMemo(() => {
        return [
            // One large dominant planet in the center background
            {
                position: [20, 0, -20] as [number, number, number],
                size: 14,
                color: '#5a6a7a',
                speed: 0.0001,
                textureUrl: '/textures/Texturelabs_Soil_120S.jpg',
                emissive: '#1a1a2e',
                emissiveIntensity: 0.15,
                roughness: 0.1
            },
            // Small planets spread out - avoiding the large planet area
            {
                position: [-25, 8, -15] as [number, number, number],
                size: 1.2,
                color: '#3d4f68',
                speed: 0.015,
                textureUrl: '/textures/Texturelabs_Soil_120S.jpg',
                emissive: '#0f4c75',
                emissiveIntensity: 0.1,
                roughness: 0.1
            },
            {
                position: [-15, -10, -18] as [number, number, number],
                size: 1.0,
                color: '#2a3a4c',
                speed: 0.012,
                textureUrl: '/textures/Texturelabs_Soil_120S.jpg',
                emissive: '#1a1a2e',
                emissiveIntensity: 0.1,
                roughness: 0.1
            },
            {
                position: [5, -12, -12] as [number, number, number],
                size: 0.9,
                color: '#3c5a74',
                speed: 0.02,
                textureUrl: '/textures/Texturelabs_Soil_120S.jpg',
                emissive: '#0e4c92',
                emissiveIntensity: 0.1,
                roughness: 0.1
            },
            {
                position: [-20, 12, -14] as [number, number, number],
                size: 0.8,
                color: '#304a5a',
                speed: 0.018,
                textureUrl: '/textures/Texturelabs_Soil_120S.jpg',
                emissive: '#0a3d62',
                emissiveIntensity: 0.1,
                roughness: 0.1
            },
            {
                position: [8, 15, -25] as [number, number, number],
                size: 0.7,
                color: '#44556e',
                speed: 0.008,
                textureUrl: '/textures/Texturelabs_Soil_120S.jpg',
                emissive: '#1e3a5f',
                emissiveIntensity: 0.1,
                roughness: 0.1
            }
        ]
    }, [])

    // Generate random stars - avoiding the large planet area and ensuring good separation
    const stars = useMemo(() => {
        const starPositions: [number, number, number][] = []
        const largePlanetX = 20
        const largePlanetY = 0
        const largePlanetZ = -20
        const planetExclusionRadius = 18 // Larger than planet size to ensure no overlap
        const minStarSeparation = 3 // Minimum distance between stars

        const isValidPosition = (x: number, y: number, z: number): boolean => {
            // Check distance from large planet
            const dx = x - largePlanetX
            const dy = y - largePlanetY
            const dz = z - largePlanetZ
            const distanceToPlanet = Math.sqrt(dx * dx + dy * dy + dz * dz)

            if (distanceToPlanet <= planetExclusionRadius) {
                return false
            }

            // Check distance from other stars
            for (const [sx, sy, sz] of starPositions) {
                const sdx = x - sx
                const sdy = y - sy
                const sdz = z - sz
                const distanceToStar = Math.sqrt(sdx * sdx + sdy * sdy + sdz * sdz)

                if (distanceToStar < minStarSeparation) {
                    return false
                }
            }

            return true
        }

        let attempts = 0
        const maxAttempts = 2000

        while (starPositions.length < 100 && attempts < maxAttempts) {
            const x = (Math.random() - 0.5) * 60
            const y = (Math.random() - 0.5) * 40
            const z = (Math.random() - 0.5) * 50 - 10

            if (isValidPosition(x, y, z)) {
                starPositions.push([x, y, z])
            }
            attempts++
        }

        return starPositions
    }, [])

    return (
        <>
            {/* Ambient lighting */}
            <ambientLight intensity={0.2} />

            {/* Key light from the side */}
            <directionalLight position={[10, 5, 5]} intensity={1.2} color="#ffffff" />

            {/* Rim light for depth */}
            <pointLight position={[-10, -5, 10]} intensity={0.6} color="#4a90e2" />

            {/* Space dust clouds */}
            <Cloud
                opacity={0.15}
                speed={0.1}
                segments={20}
                scale={5}
                position={[5, 3, -28]}
                color="#6b7280"
            />
            <Cloud
                opacity={0.1}
                speed={0.08}
                segments={15}
                scale={3}
                position={[-8, -4, -30]}
                color="#4b5563"
            />
            <Cloud
                opacity={0.12}
                speed={0.12}
                segments={18}
                scale={2}
                position={[12, -6, -30]}
                color="#374151"
            />

            {/* Planets with parallax effect */}
            {planets.map((planet, index) => (
                <Planet key={index} {...planet} />
            ))}

            {/* Tiny glowing stars */}
            {stars.map((position, index) => (
                <Star key={index} position={position} />
            ))}

            {/* Bloom effect for stars and atmosphere */}
            <EffectComposer>
                <Bloom
                    intensity={1.5}
                    luminanceThreshold={0.3}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    )
}
