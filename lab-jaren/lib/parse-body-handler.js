'use strict';

module.exports = function(message, callback) {
  let bodyText = '';
  message.on('data', (buffer) => {
    bodyText += buffer.toString();
  });

  message.on('end', function() {
    try {
      let result = JSON.parse(bodyText);
      callback(null, result);
    } catch(err) {
      callback(err);
    }
  });
};
