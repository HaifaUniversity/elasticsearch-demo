var request = require('request');
var fs = require('fs');
var source = process.env.source;
//elasticsearch server info
var elasticsearch_url = process.env.elasticsearch_url;

var clear_data = function() {
  var message = {
    "query": {
      "match_all": {}
    }

  }

  var options = {
    url: elasticsearch_url + '/btc',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': message.length
    },
    body: JSON.stringify(message)
  }

  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
    } else {
      console.log('\nCleared Data:' + body);
    }
  });
}

var create_mapping = function() {
  setTimeout(function() {
    var mapping = {
      "settings": {
        "index": {
          "number_of_shards": 3,
          "number_of_replicas": 2
        }
      },
      "mappings": {
        "btc": {
          "properties": {
            "date": {
              "type": 'date',
              "index": 'true',
              "format": 'yyyy-MM-dd HH:mm:ss'
            },
            "USD": {
              "type": "double"
            }
          }
        }
      }
    }

    var options = {
      url: elasticsearch_url + '/btc',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': mapping.length
      },
      body: JSON.stringify(mapping)
    }

    request(options, function(error, response, body) {
      console.log('\nCreating Map......')
      if (error) {
        console.log('\n' + error + '\n');
      } else {
        console.log('\nMap Status: ' + response.body);
      }
    });
  }, 1000);
}

var sendData = function(date, btc) {
  var options = {
    url: elasticsearch_url + '/btc/btc',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'date': date,
      'USD': btc
    })
  }

  request(options, function(error, response, body) {
    if (error) {
      console.log('\n' + error);
    }
  });
}

module.exports.clear_data = clear_data;
module.exports.create_mapping = create_mapping;
module.exports.sendData = sendData;