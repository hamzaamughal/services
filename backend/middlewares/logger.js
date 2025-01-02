// Middleware Example (middlewares/logger.js)
// Logs request details
module.exports = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
