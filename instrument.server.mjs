import * as Sentry from '@sentry/react-router';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
    dsn: 'https://83a8ccfdea248d1baf3fa5ed7d66795e@o4509882485768192.ingest.de.sentry.io/4509896029700176',

    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    // Enable logs to be sent to Sentry
    enableLogs: true,

    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    profilesSampleRate: 1.0, // profile every transaction
});
