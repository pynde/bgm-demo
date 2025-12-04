import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_centerAbsolute/why')({
    component: Why,
})

function Why() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">Why use this?</h1>
            <p>Placeholder for the "Why" section.</p>
        </div>
    )
}
