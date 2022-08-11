const fs = require("fs");
const path = require("path");

const handleHomeRoute = (req, res) => {
  const filePath = path.join(__dirname, "..", "front", "index.html");
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
};

const handlePublic = (req, res, url) => {
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
  };

  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 file not found</h1>");
    } else {
      res.writeHead(200, { "Content-Type": extensionType[extension] });
      res.end(data);
    }
  });
  console.log(url);
};

const getSuggestions = (searchtext, res) => {
  const file = fs.readFile("./front/states.json", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Sorry, we've had a problem on our end</h1>");
    } else  {
      const states = JSON.parse(data.toString());
      let matches = states.filter((word) => {
        const regex = new RegExp(`^${searchtext}`, "gi");
        return word.name.match(regex) || word.abbr.match(regex);
      });

      if ( matches.length == 0) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(matches));
      }
    }
  });
};

module.exports = {
  handleHomeRoute,
  handlePublic,
  getSuggestions,
};
