const fetchdata = (method, url, data, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var result = JSON.parse(xhr.responseText);
        if (result.err) {
          cb(result.err);
        } else {
          return cb(null, result.result);
        }
      }
    }
  };

  xhr.open(method, url, true);
  xhr.send(JSON.stringify(data));
};
