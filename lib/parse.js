'use strict';


module.exports = function(req, callback){
  let bodyText = '';
  req.on('data', function(buffer){
    bodyText += buffer.toString();
  });

  req.on('end', function(){
    try {
      let result = JSON.parse(bodyText);
      callback(null, result);
    } catch(err){
      callback(err);
    }
  });
};
