const handlers = require("./handlers.js");

const router = (req, res) => {
  let urlObj = req.url.split("?");
  const url = urlObj[0];
  if (url === "/") {
    handlers.handleHomeRoute(req, res);
  } else if (url === "/search") {
    const searchParams = urlObj[1].split('=')
        const key = searchParams[1]
    handlers.getSuggestions(key, res);
  } else if (url.indexOf("front") !== -1) {
    handlers.handlePublic(req, res, url);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 file not found</h1>");
  }
};

module.exports = router;
