import 'whatwg-fetch';
import AsyncStorage from '@react-native-community/async-storage';

import {
  REQUIRED_ERROR,
  UNAUTH_ERROR,
  GENERAL_ERROR,
  INTERNAL_ERROR,
} from './constants';

// import NavigationService from '../navigation/NavigationService';

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
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    const error = new Error(UNAUTH_ERROR);
    error.response = response;
    await clearAccessToken();
    // setTimeout(() => {
    //   NavigationService.navigate('Auth', {
    //     loginFailed: true,
    //     message: 'Session timeout, please login again',
    //   });
    // }, 500);
    throw error;
  }
  if (response.status === 422) {
    const error = new Error(REQUIRED_ERROR);
    error.response = response;
    throw error;
  }
  if (response.status === 500) {
    const error = new Error(INTERNAL_ERROR);
    error.response = response;
    throw error;
  }
  const error = new Error(GENERAL_ERROR);
  error.response = response;
  throw error;
}

/**
 * Get the Access token from Async Storage
 */
async function getAccessTokenFromAsyncStorage() {
  return AsyncStorage.getItem('@appusertoken');
}

async function clearAccessToken() {
  return AsyncStorage.removeItem('@appusertoken');
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(url, options) {
  const updatedOptions = options;
  const accessToken = await getAccessTokenFromAsyncStorage();
  if (accessToken) {
    updatedOptions.headers = {
      ...options.headers,
      'Cache-Control': 'No-Store',
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(handleError);
}
