import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import { ThemeContextType } from '@/contexts/ThemeContext'
import App from '@/App'
import { CenterDownPanel } from '@/components/CenterDownPanel'

type RouterContextType = {
  selectedTheme: ThemeContextType['selectedTheme'];
}

export const Route = createRootRouteWithContext<RouterContextType>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'BGM Demo',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-linear-to-r from-slate-900 to-slate-700 text-white min-h-screen">
        <div id="root" className='overflow-hidden relative'>
          {/* Center Down Area - Cards */}
          <div className="w-full z-3 flex justify-center absolute bottom-4">
            <CenterDownPanel className="h-52 mt-auto" />
          </div>
          {/* Main */}
          <App />
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
