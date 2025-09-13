'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { useState } from 'react'

// Initialize PostHog
if (typeof window !== 'undefined') {
  posthog.init('phc_5Vxx0XT8Ug3eWROhP6mm4D6D2DgIIKT232q4AKxC2ab', {
    api_host: 'https://us.i.posthog.com',
    debug: false,
    autocapture: false,
    capture_exceptions: true,
    capture_pageview: false,
    send_in_background: true,
    persistence: 'localStorage',
  })
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider client={posthog}>
        {children}
      </PostHogProvider>
    </QueryClientProvider>
  )
}
