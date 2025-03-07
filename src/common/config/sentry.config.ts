import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  sentryDsn: process.env.SENTRY_DSN,
  sentryRelease: process.env.SENTRY_RELEASE,
  sentryTracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE,
  sentryProfilingSampleRate: process.env.SENTRY_PROFILING_SAMPLE_RATE,
  sentryServerName: process.env.SENTRY_SERVER_NAME,
}));
