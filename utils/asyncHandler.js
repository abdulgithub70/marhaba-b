// Wraps async route handlers so errors are forwarded to the Express error middleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
