const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/compare-commits',
    createProxyMiddleware({
      target: 'http://compare-and-commit.kro.kr/',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/compare-languages',
    createProxyMiddleware({
      target: 'http://compare-and-commit.kro.kr/',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/top-five-languages',
    createProxyMiddleware({
      target: 'http://compare-and-commit.kro.kr/',
      changeOrigin: true,
    })
  );
};
