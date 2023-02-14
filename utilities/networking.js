/*eslint-disable*/
function timeout(request, duration, api) {
  return new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      resolve({});
    }, duration);

    request.then(
      (res) => {
        clearTimeout(timeout);
        timeout = null;
        resolve(res);
      },
      (err) => {
        clearTimeout(timeout);
        timeout = null;
        resolve({});
      }
    );
  });
}

export function getWithTimeout(api, headers) {
  (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
    console.log("getWithTimeout");
  return timeout(get(api, headers), 60000, api);
}

export function get(api, headers) {
  return fetch(api, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  })
    .then((response) => {
      return response.json().then((data) => {
        (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
          console.log("%cnetworking get", "color:#4AF82F", api, {
            status: response.status,
            data,
          });
        return data;
      });
    })
    .catch((err) => {
      (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
        console.log(
          "There is an error occurred while requesting api",
          err,
          api
        );
      return { data: null };
    });
}

export function postWithTimeout(api, headers, body) {
  return timeout(post(api, headers, body), 60000, api);
}

export function post(api, headers, body) {
  if (typeof body === "object" && body.constructor !== FormData)
    body = JSON.stringify(body);
  let heads = {};
  if (headers["Content-Type"])
    heads = {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  else
    heads = {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  return fetch(api, {
    method: "post",
    headers: heads,
    body: body,
  })
    .then((response) => {
      return response.json().then((data) => {
        (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
          console.log("%cnetworking post", "color:#4AF82F", api, {
            status: response.status,
            data,
          });
        return data;
      });
    })
    .catch((err) => {
      (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
        console.log(
          "There is an error occurred while requesting api",
          err,
          api
        );
      return { data: null };
    });
}

export function getFileWithTimeout(api, headers, body) {
  return timeout(getFile(api, headers, body), 60000, api);
}

export function getFile(api, headers, body) {
  if (typeof body === "object" && body.constructor !== FormData)
    body = JSON.stringify(body);
  let heads = {};
  if (headers["Content-Type"])
    heads = {
      ...headers,
      "Content-Type": "application/json",
    };
  else
    heads = {
      ...headers,
      "Content-Type": "application/json",
    };
  return fetch(api, {
    method: "post",
    headers: heads,
    body: body,
  })
    .then((res) => res.blob())
    .then((response) => {
      const file = new Blob([response], {
        type: "application/pdf",
      });
      const fileURL = URL.createObjectURL(file);
      return fileURL;
    })
    .catch((err) => {
      (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
        console.log(
          "There is an error occurred while requesting api",
          err,
          api
        );
      return { data: null };
    });
}

export function postFileWithTimeout(api, headers, files) {
  return timeout(postFile(api, headers, files), 60000, api);
}

export function postFile(api, headers, files) {
  var formData = new FormData();
  files.forEach((item) => {
    formData.append("files", item);
  });
  let heads = {};
  heads = {
    ...headers,
  };
  return fetch(api, {
    method: "post",
    headers: heads,
    body: formData,
  })
    .then((response) => {
      return response.json().then((data) => {
        (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
          console.log("%cnetworking post", "color:#4AF82F", api, {
            status: response.status,
            data,
          });
        return data;
      });
    })
    .catch((err) => {
      (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
        console.log(
          "There is an error occurred while requesting api",
          err,
          api
        );
      return { data: null };
    });
}

export function deleteWithTimeout(api, headers, body) {
  (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
    console.log("deleteWithTimeout");
  return timeout(_delete(api, headers, body), 30000, api);
}

export function _delete(api, headers, body) {
  if (typeof body === "object" && body.constructor !== FormData)
    body = JSON.stringify(body);

  let heads = {};
  if (headers["Content-Type"])
    heads = {
      ...headers,
      Accept: "application/json",
    };
  else
    heads = {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

  return fetch(api, {
    method: "delete",
    headers: heads,
    body: body,
  })
    .then((response) => {
      return response.json().then((data) => {
        (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
          console.log("%cnetworking delete", "color:#4AF82F", api, {
            status: response.status,
            data,
          });
        return data;
      });
    })
    .catch((err) => {
      (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
        console.log(
          "There is an error occurred while requesting api",
          err,
          api
        );
      return { data: null };
    });
}

export function putWithTimeout(api, headers, body) {
  (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
    console.log("putWithTimeout");
  return timeout(put(api, headers, body), 30000, api);
}

export function put(api, headers, body) {
  if (typeof body === "object" && body.constructor !== FormData)
    body = JSON.stringify(body);

  let heads = {};
  if (headers["Content-Type"])
    heads = {
      ...headers,
      Accept: "application/json",
    };
  else
    heads = {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

  return fetch(api, {
    method: "put",
    headers: heads,
    body: body,
  })
    .then((response) => {
      return response.json().then((data) => {
        (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
          console.log("%cnetworking put", "color:#4AF82F", api, {
            status: response.status,
            data,
          });
        return data;
      });
    })
    .catch((err) => {
      (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
        console.log(
          "There is an error occurred while requesting api",
          err,
          api
        );
      return { data: null };
    });
}
