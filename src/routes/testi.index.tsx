import { Canvas } from '@react-three/fiber'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/testi/')({
    component: RouteComponent,
})

function RouteComponent() {

    return (
        <Canvas className='z-10 border bg-black/10'>
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshBasicMaterial color="yellow" />
            </mesh>
            <ambientLight intensity={0.1} />
            <directionalLight position={[0, 0, 5]} color="red" />
        </Canvas>
    )
}
