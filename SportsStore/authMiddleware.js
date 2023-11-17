const jwt = require("jsonwebtoken")

const APP_SECRET = "myappsecret";
const USERNAME = "admin";
const PASSWORD = "admin";

const mappings = {
  get: [
    "/api/orders",
    "/orders"
  ],
  post: [
    "/api/products",
    "/products",
    "/api/categories",
    "/categories"
  ]
};

function requiresAuth(method, url) {
  return (mappings[method.toLowerCase()] || [])
    .find(p => url.startsWith(p)) !== undefined;
}

module.exports = function(request, result, next) {
  if (request.url.endsWith("/login") && request.method === "POST") {
    if (request.body && request.body.name === USERNAME && request.body.password === PASSWORD) {
      let token = jwt.sign({data: USERNAME, expiresIn: "1h"}, APP_SECRET);
      result.json({success: true, token: token});
    } else {
      result.json({success: false});
    }
    result.end ();
    return;
  } else if (requiresAuth(request.method, request.url)) {
    let token = request.headers["authorization"] || "";
    if (!token.startsWith("Bearer<")) {
      result.statusCode = 401;
      result.end();
      return;
    }
    token = token.substring(7, token.length - 1);
    try {
      jwt.verify(token, APP_SECRET);
      next();
      return;
    } catch (err) {}
  }
  next();
}
