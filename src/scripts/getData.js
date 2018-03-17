function request(url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, false);
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
        // resolve(JSON.parse(this.response));
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network Error'));
    };

    xhr.send();
  });
}

export default function getData(url) {
  return request(url);
}
