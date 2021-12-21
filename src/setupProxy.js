const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/compare-commits',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/compare-languages',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/top-five-languages',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
