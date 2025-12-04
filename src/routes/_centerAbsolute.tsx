import { Card } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_centerAbsolute')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Card className='absolute z-5 w-[60%] m-6'>
            <div className='absolute top-0 left-0 bg-black/30 rounded-md w-full h-full backdrop-blur-xs' />
            <div className='relative flex justify-center items-center flex-col p-6'>
                <Outlet />
            </div>
        </Card>
    )
}
