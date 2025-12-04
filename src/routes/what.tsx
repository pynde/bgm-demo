import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/what')({
    component: What,
})

function What() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4">What is this?</h1>
            <p>Placeholder for the "What" section.</p>
        </>
    )
}
