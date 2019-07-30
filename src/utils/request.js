import 'whatwg-fetch';

/**
 * Returns the thrown error message
 *
 * @param  {object} Error response from a network request
 *
 * @return {object} The constructed Error Message from the request
 */
async function handleError(error) {
  let processedErrorResponse;
  try {
    processedErrorResponse = await error.response.json();
  } catch (e) {
    processedErrorResponse = null;
  }
  return {
    status: error && error.response ? error.response.status : null,
    message: error.message,
    response: processedErrorResponse,
  };
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  // TODO alex try catch error .
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(handleError);
}
