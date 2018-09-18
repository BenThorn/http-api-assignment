const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  console.log(request.headers);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  if (acceptedTypes[0] === 'text/xml') {
    if (parsedUrl.pathname === '/success') {
      xmlHandler.success(request, response);
    } else if (parsedUrl.pathname === '/badRequest') {
      xmlHandler.badRequest(request, response, params);
    } else if (parsedUrl.pathname === '/unauthorized') {
      xmlHandler.unauthorized(request, response, params);
    } else if (parsedUrl.pathname === '/forbidden') {
      xmlHandler.forbidden(request, response, params);
    } else if (parsedUrl.pathname === '/internal') {
      xmlHandler.internal(request, response, params);
    } else if (parsedUrl.pathname === '/notImplemented') {
      xmlHandler.notImplemented(request, response, params);
    } else {
      xmlHandler.notFound(request, response, params);
    }
  } else if (acceptedTypes[0] !== 'text/xml') {
    if (parsedUrl.pathname === '/') {
      htmlHandler.getIndex(request, response);
    } else if (parsedUrl.pathname === '/style.css') {
      htmlHandler.getCSS(request, response);
    } else if (parsedUrl.pathname === '/success') {
      jsonHandler.success(request, response);
    } else if (parsedUrl.pathname === '/badRequest') {
      jsonHandler.badRequest(request, response, params);
    } else if (parsedUrl.pathname === '/unauthorized') {
      jsonHandler.unauthorized(request, response, params);
    } else if (parsedUrl.pathname === '/forbidden') {
      jsonHandler.forbidden(request, response);
    } else if (parsedUrl.pathname === '/internal') {
      jsonHandler.internal(request, response);
    } else if (parsedUrl.pathname === '/notImplemented') {
      jsonHandler.notImplemented(request, response);
    } else {
      jsonHandler.notFound(request, response);
    }
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
