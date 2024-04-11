const CORS_WHITELIST = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      // Allow if origin is in whitelist or if it's not defined (for same-origin requests)
      callback(null, true);
    } else {
      // Deny if origin is not in whitelist
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = corsOptions;
