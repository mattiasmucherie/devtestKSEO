const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
// Add Auth0 credentials
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-395gza3h.eu.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://scania-kseo",
  issuer: "https://dev-395gza3h.eu.auth0.com/",
  algorithms: ["RS256"]
});
module.exports = { jwtCheck };
