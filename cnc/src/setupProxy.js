const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        "/compare_commits",
        createProxyMiddleware({
            target: "http://3.36.70.50",
            changeOrigin: true
        })
    );
    console.log("proxy created")
};