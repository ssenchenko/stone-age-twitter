// a stub; Sentry can be used instead in a real project
const logger = {
  error: (error, info) => { console.error('[ERROR]', error, info); },
  // TODO: set environment variable for DEBUG
  debug: (...theArgs) => { console.log('[DEBUG]', ...theArgs); },
};

export default logger;
