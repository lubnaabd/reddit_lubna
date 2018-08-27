const fetchdata = (method, url, data) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var result = JSON.parse(xhr.responseText);
          if (result.err) {
            reject(result.err);
          } else {
            return resolve(result.result);
          }
        }
      }
    };

    xhr.open(method, url, true);
    xhr.send(JSON.stringify(data));
  });
