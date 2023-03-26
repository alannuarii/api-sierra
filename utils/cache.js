const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

function cacheMiddleware(duration) {
  return (req, res, next) => {
    const key = "__express__" + req.originalUrl || req.url;
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
      res.send(cachedResponse);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.set(key, body, duration);
        res.sendResponse(body);
      };
      next();
    }
  };
}

module.exports = { cacheMiddleware };
