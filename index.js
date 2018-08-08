var http, director, bot, router, server, port, schedule;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
schedule    = require('node-schedule');

router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function (req, res) {
  var j = schedule.scheduleJob('5 17 * * FRI', function(){
    res.writeHead(200);
    bot.alert("hi");
    res.end();
  });

  req.chunks = [];
  req.on('data', function (chunk) {
    console.log(chunk.toString());
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
}