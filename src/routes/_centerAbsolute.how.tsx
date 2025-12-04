import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_centerAbsolute/how')({
    component: How,
})

function How() {
    return (
        <div className="max-w-2xl space-y-6 text-center">
            <h1 className="text-4xl font-bold mb-4">How it works</h1>

            <div className="space-y-4 text-left text-lg text-foreground">
                <p>
                    <strong className="text-foreground">Create the Logic:</strong> Build your board game from scratch using our intuitive UI. Define rules, mechanics, and interactions to create a fully playable prototype.
                </p>
                <p>
                    <strong className="text-foreground">Design for Print:</strong> Craft physical components that are ready for production. Our tools help you design cards and boards that comply with professional producer templates, automatically handling sizes and bleed margins.
                </p>
                <p>
                    <strong className="text-foreground">Play Anywhere:</strong> Experience your game immediately. You get a dual output: a digital version to play online and print-ready files for your physical product.
                </p>
            </div>
        </div>
    )
}
