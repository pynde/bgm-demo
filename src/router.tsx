import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { ThemeProvider } from './contexts/ThemeContext';

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {
      selectedTheme: null,
    },
    Wrap: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
  });

  return router
}
