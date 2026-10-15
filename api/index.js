// Vercel serverless function entrypoint
const app = require('../server/src/index');

module.exports = (req, res) => {
  // Ensure req.url starts with /api for compatibility with Express routes
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  return app(req, res);
};
