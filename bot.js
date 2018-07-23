var HTTPS = require('https');
var HTTP = require('http');
var fs    = require('fs');


var botID = process.env.BOT_ID;
var apiKey = process.env.API_KEY;
var gmKey = process.env.GM_KEY;
var client = new Client();
await client.connect();

function respond() {

  var request = JSON.parse(this.req.chunks[0]),
      giphyCommand = '/giphy';
    this.res.writeHead(200);
    if(request.text && request.text.length > giphyCommand.length && request.text.substring(0, giphyCommand.length) === giphyCommand) {
        searchGiphy(request.text.substring(giphyCommand.length + 1));
    }
    if(request.text && (request.text.match(/\+/g) || []).length == 2 && request.text.slice(request.text.length-2, request.text.length) === "++") {
      var user = request.name;
      var scum = request.text.replace(/\+/g,"");
      if(user.toLowerCase().indexOf(scum.toLowerCase()) !== -1) {
        postMessage("Nice try");
      } else {
          await client.query('INSERT INTO scum_levels (name, value) VALUES ('+scum+', 1)');
          var result = await client.query("SELECT sum(value) as total FROM scum_levels WHERE name is '"+scum+"'");
          await client.end();
          postMessage("Scum levels: " + scum + " " + result[0]['total']);
      };
    }
    this.res.end();

}

function searchGiphy(giphyToSearch) {
  var options = {
    host: 'api.giphy.com',
    path: '/v1/gifs/random?tag=' + encodeQuery(giphyToSearch) + '&api_key=' + apiKey,
    accept: 'image/*'
  };

  var callback = function(resp) {
    body ='';
    var cb = function(data) {
      body +=data;
    }
    var cm = function() {
      body = JSON.parse(body);
      var url = body.data.images.downsized.url;
      postMessage(url,"");
    }
    resp.on('data', cb);
    resp.on('end', cm);

  };

  HTTPS.request(options, callback).end();
}

function encodeQuery(query) {
  return query.replace(/\s/g, '+');;
}

function postMessage(message, image_url) {
  var botResponse, options, body, botReq;

  botResponse = message;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse,
    "attachments" : [
      {
        "type"  : "image",
        "url"   : image_url
       }
   ]
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        console.log('202 response');
      } else {
        console.log(res);
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