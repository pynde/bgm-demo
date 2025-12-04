import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function WarAnimation() {
    const count = 200
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        return pos
    }, [])

    const speeds = useMemo(() => {
        const spd = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            spd[i] = Math.random() * 0.02 + 0.005
        }
        return spd
    }, [])

    const ref = useRef<THREE.Points>(null)

    useFrame(() => {
        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array as Float32Array
            for (let i = 0; i < count; i++) {
                positions[i * 3 + 1] += speeds[i]
                if (positions[i * 3 + 1] > 5) {
                    positions[i * 3 + 1] = -5
                    positions[i * 3] = (Math.random() - 0.5) * 10
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
                }
            }
            ref.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ff4500"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    )
}
