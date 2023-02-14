/**
 * Created by Hong HP on 4/27/18.
 */
/*eslint-disable*/
import {
  getWithTimeout,
  postWithTimeout,
  deleteWithTimeout,
  putWithTimeout,
  getFileWithTimeout,
  postFileWithTimeout
} from "./networking";

let accessToken = "";

export async function getAccessToken() {
  const newToken = await localStorage.getItem("TOKEN");
  if (newToken) {
    accessToken = newToken;
  }
  return accessToken;
}

export function getWithCheckingToken(api, headers) {
  if (!headers || !headers["token"])
    headers = {
      ...headers
    };
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
    return getWithTimeout(api, headers);
  });
}

export function postWithCheckingToken(api, headers, body) {
  if (!headers || !headers["token"])
    headers = {
      ...headers
    };
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
    return postWithTimeout(api, headers, body);
  });
}

export function getFileWithCheckingToken(api, headers, body) {
  if (!headers || !headers["token"])
    headers = {
      ...headers
    };
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
    return getFileWithTimeout(api, headers, body);
  });
}

export function postFileWithCheckingToken(api, headers, files) {
  if (!headers || !headers["token"])
    headers = {
      ...headers
    };
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
    return postFileWithTimeout(api, headers, files);
  });
}

export function putWithCheckingToken(api, headers, body) {
  if (!headers || !headers["token"])
    headers = {
      ...headers
    };
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
    return putWithTimeout(api, headers, body);
  });
}

export function deleteWithCheckingToken(api, headers, body) {
  if (!headers || !headers["token"])
    headers = {
      ...headers,
      token: token
    };
  return deleteWithTimeout(api, headers, body);
}
