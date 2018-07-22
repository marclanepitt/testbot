var HTTPS = require('https');
var HTTP = require('http');
var fs    = require('fs');


var botID = process.env.BOT_ID;
var apiKey = process.env.API_KEY;
var gmKey = process.env.GM_KEY;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      giphyCommand = '/giphy';

  if(request.text &&
     request.text.length > giphyCommand.length &&
     request.text.substring(0, giphyCommand.length) === giphyCommand) {
    this.res.writeHead(200);
    searchGiphy(request.text.substring(giphyCommand.length + 1));
    this.res.end();
  } else {
    this.res.writeHead(200);
    this.res.end();
  }
}

function searchGiphy(giphyToSearch) {
  var options = {
    host: 'api.giphy.com',
    path: '/v1/gifs/search?q=' + encodeQuery(giphyToSearch) + '&api_key=' + apiKey,
    accept: 'image/*'
  };

  var callback = function(resp) {
    body ='';
    var cb = function(data) {
      body +=data;
    }
    var cm = function() {
      body = JSON.parse(body);
      var url = body.data[0].images.fixed_width.url;
        var callback = function(resp) {
          resp.setEncoding('binary');
          var result = [ ];
          var gb = function(data) {
            result.push(Buffer(data,"binary"));
          }
          var gm = function() {
            console.log(result)
            var binary = Buffer.concat(result);
            console.log(binary)
            postToImageService(binary);
          }
          resp.on('data', gb);
          resp.on('end', gm);
      }

      HTTPS.get(url, callback).end()
    }
    resp.on('data', cb);
    resp.on('end', cm);

  };

  HTTPS.request(options, callback).end();
}

function postToImageService(image) {
    var postOptions = {
      host: 'image.groupme.com',
      path: '/pictures',
      headers : {
        'X-Access-Token': gmKey,
        'Content-Type': 'image/gif'
      },
      method: 'POST',
      body: image
    }

    var callback = function(resp) {
      result = '';
      var cb = function(data) {
        result +=data;
      }
      var cm = function() {
        console.log(result)
      }
      resp.on('data', cb);
      resp.on('end', cm);

    };

    HTTPS.request(postOptions, callback).end();
}

function encodeQuery(query) {
  return query.replace(/\s/g, '+');;
}

function postMessage(message) {
  var botResponse, options, body, botReq;

  botResponse = message;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        console.log('202 response');
      } else {
        console.log('rejecting bad status code from groupme:' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;