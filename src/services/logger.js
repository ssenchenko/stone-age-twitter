// a stub; Sentry can be used instead in a real project
const logger = {
  error: (error, info) => { console.error('[ERROR]', error, info); },

  debug: (...theArgs) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEBUG]', ...theArgs); // eslint-disable-line no-console
    }
  },
};

export default logger;
