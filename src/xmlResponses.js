const respondXML = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'text/xml',
  };

  response.writeHead(status, headers);
  response.write(object);
  response.end();
};

const success = (request, response) => {
  const responseXML = '<response><message>This is a successful result.</message></response>';

  respondXML(request, response, 200, responseXML);
};

const badRequest = (request, response, params) => {
  let responseXML = '<response><message>This had the proper parameters.</message></response>';

  if (!params.valid || params.valid !== 'true') {
    responseXML = '<response><message>This did not have the proper parameters.</message><id>badRequest</id></response>';
    return respondXML(request, response, 400, responseXML);
  }
  return respondXML(request, response, 200, responseXML);
};

const unauthorized = (request, response, params) => {
  let responseXML = '<response><message>This had the proper credentials.</message></response>';

  if (!params.valid || params.valid !== 'true') {
    responseXML = '<response><message>This did not have the proper loggedin value.</message><id>unauthorized</id></response>';
    return respondXML(request, response, 401, responseXML);
  }
  return respondXML(request, response, 200, responseXML);
};

const forbidden = (request, response) => {
  const responseXML = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';

  respondXML(request, response, 403, responseXML);
};

const internal = (request, response) => {
  const responseXML = '<response><message>Internal server error. Something went wrong</message><id>internalError</id></response>';

  respondXML(request, response, 500, responseXML);
};

const notImplemented = (request, response) => {
  const responseXML = '<response><message>A get request for this page is not yet implemented, please try again later.</message><id>notImplemented</id></response>';

  respondXML(request, response, 501, responseXML);
};

const notFound = (request, response) => {
  const responseXML = '<response><message>The page you were looking for is not here.</message><id>notFound</id></response>';
  respondXML(request, response, 404, responseXML);
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
