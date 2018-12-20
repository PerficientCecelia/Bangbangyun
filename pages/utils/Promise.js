var mypromise = {

  get: function(url) {
    dd.showLoading();
    return new Promise(function(resolve, reject) {
      dd.httpRequest({
        url: url,
        method: 'Get',
        dataType: 'json',
        success: function(res) {
          console.log(JSON.stringify(res));
          resolve(res.data);
        },
        fail: function(res) {
          console.log("httpRequestFail---"+JSON.stringify(res))
          reject(res);
        },
        complete: function(res) {
          dd.hideLoading();
        }
      });
    })
  },
  post: function(url, data) {
    dd.showLoading();
    let stringJson=JSON.stringify(data);
    let finalUrl = url + '?id=' + stringJson;
    finalUrl = encodeURI(finalUrl);
    return new Promise(function(resolve, reject) {
      dd.httpRequest({
        url: finalUrl,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        dataType: 'json',
        success: function(res) {
          console.log('success----'+JSON.stringify(res));
          resolve(res.data);
        },
        fail: function(res) {
          console.log("httpRequestFail-----", JSON.stringify(res))
          reject(res);
        },
        complete: function(res) {
          console.log(JSON.stringify(res));
          dd.hideLoading();
        }
      });
    })
  }
}

export default mypromise;