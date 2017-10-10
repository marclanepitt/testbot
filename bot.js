var HTTPS = require('https');

var botID = process.env.BOT_ID;

var beers = ['Bud Light', 'Platinums', "Bud Heavy", "Blue Moon","Nattys","Corona","Miller","Coors"];

var restaurants = ["Carolina Brewery", "Spicy 9", "Bandidos","IP3","Mellow Mushroom","Lucha Tigre","Moes","Chipotle", "Rams"];

var fs = require('fs')

var array = fs.readFileSync('shittalk.txt').toString().split("\n");

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      sOTD = /^\/scum of the day$/;
      beer = /^\/beer$/;
      dinner = /^\/dinner$/;
      smallFry = /^\/smallfry$/;
      bored = /^\/bored$/;

  var index = Math.floor(Math.random() *array.length);

  this.res.writeHead(200);

  if((request.name.indexOf("Marc") !== -1 || request.name.indexOf("Jake") !== -1) && request.text.indexOf("Scumguy roast") !==-1) {
      var roastedPerson = request.text.substring(13,request.text.length);
      var insult = array[index];
      insult = insult.substring(4,insult.length);
      postMessage(roastedPerson+"," + insult);
  }

  // if(request.text && sOTD.test(request.text)) {
  //   postMessage("Text: " + JSON.stringify(request) + "\nName: " + request.name);
  // }
  // if(beer.test(request.text)) {
  //   postMessage("You guys should be drinking " + beers[Math.floor(Math.random()*beers.length)] + " tonight");
  // }
  // if(dinner.test(request.text)) {
  //   postMessage("Let's get " + restaurants[Math.floor(Math.random()*restaurants.length)] + " tonight");
  // }
  // if(request.text.indexOf("What did Andrew buy?") !== -1) {
  //   postMessage("The Blue Moons");
  // }
  // if(smallFry.test(request.text)) {
  //   postMessage("When you get screwed out of a small fry", "https://i.groupme.com/540x960.jpeg.829fb06a5d94408895a6e7d59562a1ab");
  // }
  // if(request.text.indexOf("Push me to the edge") !== -1) {
  //   postMessage("","https://i.groupme.com/750x1334.jpeg.4e0db5f28b65414fb43e322cd9146a91")
  // }
  // if(request.name.indexOf("Andre") !== -1 ) {
  //   postMessage("I'm pretty spiritually aware and religious. It adds a layer to my life that does assist me greatly.");
  // }
  // if(request.text.indexOf("$") !== -1) {
  //   postMessage("Money is the root of all evil " + request.name + "!");
  // }
  
  // if(bored.test(request.text)) {
  //   postMessage("Copy and Paste the message below and send it with your first move to start");
  //   postMessage("Tic Tac Toe                              \
  //                                                   - - - \
  //                                                                - - - \
  //                                                                - - -")
  // }
  // if(request.text.indexOf("Tic Tac Toe") !== -1 && request.name != "Scum Guy") {
  //   var tic = request.text;
  //   var tac;
  //   postMessage(tic.length);
  // }

  this.res.end();
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
