// a stub; Sentry can be used instead in a real project
const logger = {
  error: (error, info) => (console.error('[ERROR]', error, info)),
};

export default logger;
