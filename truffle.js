module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  },
    networks: {
	"alloc": {
	  network_id: 31415926, // custom private network
	  host:"localhost",
	  port: 8545
	},
  }
};
