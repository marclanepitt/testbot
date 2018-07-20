var HTTPS = require('https');

var botID = process.env.BOT_ID;
var apiKey = process.env.API_KEY;

var beers = ['Bud Light', 'Platinums', "Bud Heavy", "Blue Moon","Nattys","Corona","Miller","Coors"];

var restaurants = ["Carolina Brewery", "Spicy 9", "Bandidos","IP3","Mellow Mushroom","Lucha Tigre","Moes","Chipotle", "Rams"];

var fs = require('fs')

var array = fs.readFileSync('shittalk.txt').toString().split("\n");

var compliments = fs.readFileSync('compliments.txt').toString().split("\n");

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      sOTD = /^\/scum of the day$/;
      beer = /^\/beer$/;
      dinner = /^\/dinner$/;
      smallFry = /^\/smallfry$/;
      bored = /^\/bored$/;

  this.res.writeHead(200);

  if(request.text.indexOf("Scumguy roast") !==-1) {
      var index = Math.floor(Math.random() *array.length);
      var roastedPerson = request.text.substring(13,request.text.length);
      var insult = array[index];
      insult = insult.substring(4,insult.length-1).toLowerCase();
      postMessage(roastedPerson+"," + insult);
  }
  if(request.text.indexOf("Scumguy compliment") !==-1) {
      var index = Math.floor(Math.random() *compliments.length);
      var complimentedPerson ="";
      if(request.text.substring(18,request.text.length) == "me") {
        complimentedPerson = request.name;
      } else {
        complimentedPerson = request.text.substring(18,request.text.length);
      }
      var compliment = compliments[index];
      compliment = compliment.toLowerCase();
      postMessage(complimentedPerson+"," + compliment);
  }

  if(request.text.indexOf("burn") !== -1) {
    postMessage("","https://i.groupme.com/750x1334.png.b63f3de37659403e89c857afa293dc38");
  }

  this.res.end();
}

function searchGiphy(giphyToSearch) {
  var options = {
    host: 'api.giphy.com',
    path: '/v1/gifs/search?q=' + encodeQuery(giphyToSearch) + '&api_key=' + apiKey
  };

  var callback = function(response) {
    var str = '';

    response.on('data', function(chunck){
      str += chunck;
    });

    response.on('end', function() {
      if (!(str && JSON.parse(str).data[0])) {
        postMessage('Couldn\'t find a gif 💩');
      } else {
        var id = JSON.parse(str).data[0].id;
        var giphyURL = 'http://i.giphy.com/' + id + '.gif';
        postMessage("",giphyURL);
      }
    });
  };

  HTTP.request(options, callback).end();
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
  if(image_url != null) {
    body = {
      "bot_id" : botID,
      "text" : botResponse,
      "attachments" : [
         {
           "type"  : "image",
           "url"   : image_url
          }
      ]
    }
  } else {
    body = {
      "bot_id" : botID,
      "text" : botResponse
    };
  }
  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
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
