var Twitter = require('twitter');
var request = require('request');

//Twitter Account Variables
var consumer_key = process.env.consumer_key;
var consumer_secret = process.env.consumer_secret;
var access_token_key = process.env.access_token_key;
var access_token_secret = process.env.access_token_secret;
var twitter_topic = process.env.twitter_topic;

//elasticsearch server info
var elasticsearch_url = process.env.elasticsearch_url;

var client = new Twitter({
  "consumer_key": consumer_key,
  "consumer_secret": consumer_secret,
  "access_token_key": access_token_key,
  "access_token_secret": access_token_secret
});

function search_twitter() {

  var stream = client.stream('statuses/filter', {
    track: twitter_topic
  });
  stream.on('data', function(event) {

    var message = JSON.stringify({
      'Date': event.created_at,
      'UserName': event.user.screen_name,
      'Tweet': event.text,
      'URL:': 'https://twitter.com/' + event.user.screen_name + '/status/' + event.id_str
    });

    var options = {
      url: elasticsearch_url + '/twitter/optionalUniqueId',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': message.length
      },
      body: message
    }

    request(options, function(error, response, body) {
      if (error) {
        console.log(error);
      }
    });
  });

  stream.on('error', function(error) {
    console.log('\nAn error has occurred.\n' + error + '\n');
  });

  stream.on('close', function(message) {
    console.log('\n\nConnection Closed. Restarting Stream.\n\n');
    search_twitter();
  });
}

if (consumer_key && consumer_secret && access_token_key && elasticsearch_url && twitter_topic) {
  console.log('\nLooking for ' + twitter_topic);
  search_twitter();
} else {
  console.log('\n[Error: Missing arguments!]\n');
}