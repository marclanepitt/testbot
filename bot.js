var HTTPS = require('https');
var axios = require('axios');

var botID = process.env.BOT_ID;

var beers = ['Bud Light', 'Platinums', "Bud Heavy", "Blue Moon","Nattys","Corona","Miller","Coors"];

var restaurants = ["Carolina Brewery", "Spicy 9", "Bandidos","IP3","Mellow Mushroom","Lucha Tigre","Moes","Chipotle"];

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      sOTD = /^\/scum of the day$/;
      beer = /^\/beer$/;
      dinner = /^\/dinner$/;
      dadJoke = /^\/dad$/;

  this.res.writeHead(200);

  if(request.text && sOTD.test(request.text)) {
    postMessage("Text: " + JSON.stringify(request) + "\nName: " + request.name);
  } else if(beer.test(request.text)) {
    postMessage("You guys should be drinking " + beers[Math.floor(Math.random()*beers.length)] + " tonight");
  } else if(request.text.indexOf("bored") !== -1) {
    postMessage("Want to play soccer in an hour?")
  } else if(dinner.test(request.text)) {
    postMessage("Let's get " + restaurants[Math.floor(Math.random()*restaurants.length)] + " tonight");
  } else if(dadJoke.test(request.text)) {
    axios.get('https://icanhazdadjoke.com/').then(response => {
      
    });
  }

  this.res.end();
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
        //neat
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