import * as Sentry from "@sentry/remix";
import { RemixBrowser, useLocation, useMatches } from '@remix-run/react';
import { startTransition, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client'

Sentry.init({
    dsn: "https://8971f9dac208a0d92c5538a83935b7b8@o4506774794731520.ingest.sentry.io/4506774813540352",
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,

    integrations: [Sentry.browserTracingIntegration({
      useEffect,
      useLocation,
      useMatches
    }), Sentry.replayIntegration()]
})

if (ENV.MODE === 'production' && ENV.SENTRY_DSN) {
	import('./utils/monitoring.client.tsx').then(({ init }) => init())
}

startTransition(() => {
	hydrateRoot(document, <RemixBrowser />)
})