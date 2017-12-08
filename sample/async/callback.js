let request = require('request');
const url = 'http://www.baidu.com/';
request(url, (err, response, body) => {
  console.log('01', response.statusCode);
  request(url, (err, response, body) => {
    console.log('02', response.statusCode);
    request(url, (err, response, body) => {
      console.log('03', response.statusCode);
      request(url, (err, response, body) => {
        console.log('04', response.statusCode);
        request(url, (err, response, body) => {
          console.log('05', response.statusCode);
          request(url, (err, response, body) => {
            console.log('06', response.statusCode);
            request(url, (err, response, body) => {
              console.log('07', response.statusCode);
              request(url, (err, response, body) => {
                console.log('08', response.statusCode);
                request(url, (err, response, body) => {
                  console.log('09', response.statusCode);
                  request(url, (err, response, body) => {
                    console.log('10', response.statusCode);
                    request(url, (err, response, body) => {
                      console.log('11', response.statusCode);
                      request(url, (err, response, body) => {
                        console.log('12', response.statusCode);
                        request(url, (err, response, body) => {
                          console.log('13', response.statusCode);
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});