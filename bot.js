var HTTPS = require('https');
var HTTP = require('http');
var fs    = require('fs');


var botID = process.env.BOT_ID;
var apiKey = process.env.API_KEY;
var gmKey = process.env.GM_KEY;
var mashapeKey = process.env.X_MASHAPE_KEY;
const { Client, Pool } = require('pg');
const client = new Client();

function respond() {

  var request = JSON.parse(this.req.chunks[0]),
      giphyCommand = '/giphy',
      decideCommand = '/decide',
      insultCommand = '/insult',
      loveCommand = '/love';
      quoteCommand = '/quote';
      urbanCommand = '/urban';

    this.res.writeHead(200);
    if(request.text && request.text.length > giphyCommand.length && request.text.substring(0, giphyCommand.length) === giphyCommand && request.name !== "Test Guy" && request.name !== "Stav Bot") {
        searchGiphy(request.text.substring(giphyCommand.length + 1));
    }
    if(request.text && (request.text.match(/\+/g) || []).length == 2 && request.text.slice(request.text.length-2, request.text.length) === "++") {
      updateScumLevels(request, 1);
    }
    if(request.text && (request.text.match(/\-/g) || []).length == 1 && request.text.slice(request.text.length-1, request.text.length) === "-") {
      updateScumLevels(request, -1);
    }

    if(request.text && request.text.length > decideCommand.length && request.text.substring(0, decideCommand.length) === decideCommand) {
      var decideString = request.text.substring(decideCommand.length + 1);
      var decideList = decideString.split(",");

      postMessage("Rolling the dice...");
      postMessage("I choose "+ decideList[Math.floor(Math.random()*decideList.length)]);
    }

    if(request.text && request.text.length > insultCommand.length && request.text.substring(0, insultCommand.length) === insultCommand) {
      var name = request.text.substring(decideCommand.length + 1);
      sendInsult(name);
    }

    if(request.text && request.text.length > loveCommand.length && request.text.substring(0, loveCommand.length) === loveCommand) {
      var nameString = request.text.substring(loveCommand.length + 1);
      var names = nameString.split(",");
      sendLove(names);
    }

    if(request.text === quoteCommand) {
      sendMotivation();
    }

    if(request.text === "/help") {
      postMessage(`/giphy <search term> - Looks up a gif with the search term \r\n
/decide comma, seperated, list, of, choices - returns one of the choices randomly \r\n
/insult <name> - insults <name> \r\n
/love <name1> , <name2> calculates love percentage of the two names \r\n
/quote - returns a random quote \r\n
<name>++ - Increases name's scum levels \r\n
<name>- - Decreases name's scum levels`)
    }

    this.res.end();

}

function alert(e) {
    if(e === "beer") {
      sendRandomBeer();
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
      var url = body.data[Math.floor(Math.random()*body.data.length)].images.downsized.url;
      postMessage(url,"");
    }
    resp.on('data', cb);
    resp.on('end', cm);

  };

  HTTPS.request(options, callback).end();
}

function sendInsult(name) {
  var options = {
    host: 'insult.mattbas.org',
    path: '/api/insult?who=' + encodeQuery(name),
    accept: '/*'
  };

  var callback = function(resp) {
    body ='';
    var cb = function(data) {
      body +=data;
    }
    var cm = function() {
      postMessage(body);
    }
    resp.on('data', cb);
    resp.on('end', cm);

  };

  HTTPS.request(options, callback).end();
}

function sendLove(names) {
  var options = {
    host: 'love-calculator.p.mashape.com',
    path: '/getPercentage?fname='+encodeQuery(names[0])+'&sname='+encodeQuery(names[1]),
    accept: 'application/json',
    headers: {
      'X-Mashape-Key': mashapeKey
    }
  };

  var callback = function(resp) {
    body ='';
    var cb = function(data) {
      body +=data;
    }
    var cm = function() {
      body = JSON.parse(body);
      postMessage(`Results \r\n
      `+names[0]+` + `+names[1]+` \r\n
      ------------------------- \r\n
      Match = `+ body.percentage +` percent \r\n
      `+ body.result);
    }
    resp.on('data', cb);
    resp.on('end', cm);

  };

  HTTPS.request(options, callback).end();
}

function sendMotivation() {
  var options = {
    host: 'andruxnet-random-famous-quotes.p.mashape.com',
    accept: 'application/json',
    headers: {
      'X-Mashape-Key': mashapeKey
    }
  };

  var callback = function(resp) {
    body ='';
    var cb = function(data) {
      body +=data;
    }
    var cm = function() {
      body = JSON.parse(body);
      postMessage(body[0].quote);
    }
    resp.on('data', cb);
    resp.on('end', cm);

  };

  HTTPS.request(options, callback).end();
}

function updateScumLevels(request, value) {
  var user = request.name;
  if(value > 0) {
    var scum = request.text.replace(/\+/g,"");
  } else {
    var scum = request.text.replace(/\-/g,"");
  }
  if(user.toLowerCase().indexOf(scum.toLowerCase()) !== -1) {
    postMessage("Nice try");
  } else {
    client.connect(function(err) {
      console.log("connection error" + err);
      client.query("INSERT INTO scum_levels (name, value) VALUES ('"+scum+"', " +value+ ")", function(err,res) {
        console.log("query 1 error" + err);

        if(!err) {
          client.query("SELECT sum(value) as total FROM scum_levels WHERE name = '"+scum+"'", function(err,res) {
            console.log("query 2 error" + err);
            postMessage("Scum levels: " + scum + " " + res.rows[0]['total']);
          });
        }
      });
    });
  };
}

function encodeQuery(query) {
  return query.replace(/\s/g, '+');;
}

function sendRandomBeer() {
  var options = {
    host: 'api.punkapi.com',
    path: '/v2/beers/random',
    accept: 'application/json',
  };

  var callback = function(resp) {
    body ='';
    var cb = function(data) {
      body +=data;
    }
    var cm = function() {
      body = JSON.parse(body);
      var an = "a";
      if(['a', 'e', 'i', 'o', 'u'].indexOf(body[0].name[0]) !== -1) {
        an = "an";
      }
      postMessage(`Happy Friday! Grab  `+an + ` ` + body[0].name + `!\r\n
      --------Beer Summary--------\r\n
      ABV: ` +body[0].abv+ ` Percent\r\n
      Description: ` +body[0].description+ `
      `);
    }
    resp.on('data', cb);
    resp.on('end', cm);

  };

  HTTPS.request(options, callback).end();
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
exports.alert = alert;