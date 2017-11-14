var request = require('request');
var fs = require('fs');
var source = process.env.source;
//elasticsearch server info
var elasticsearch_url = process.env.elasticsearch_url;

function clear_data() {
  var message = {
    "query": {
      "match_all": {}
    }

  }

  var options = {
    url: elasticsearch_url + '/flightdata',
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

function create_mapping() {
  setTimeout(function() {
    var mapping = {
      "settings": {
        "index": {
          "number_of_shards": 3,
          "number_of_replicas": 2
        }
      },
      "mappings": {
        "flightdata": {
          "properties": {
            "airline": {
              "type": "keyword",
              "index": "true"
            },
            "delays": {
              "type": "double",
              "index": "true"
            },
            "airport": {
              "type": "keyword",
              "index": "true"
            }
          }
        }
      }
    }
    var options = {
      url: elasticsearch_url + '/flightdata',
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
        console.log('\n' + error + '\n\n');
      } else {
        console.log('\n' + body);

      }
    });
  }, 5000);
}

function searchData() {
  console.log('\nReading data from: ' + source);

  var read_data = fs.readFileSync(source).toString().split("\n");
  var clean_mystring = '';

  for (i in read_data) {
    if (i != 0) {
      var a = read_data[i].split(',');
      if (a[3] && a[4] && a[13]) {
        clean_airline = a[3].replace(/\r/g, '').replace(/\"/g, '');
        clean_delay_count = a[13].replace(/\r/g, '').replace(/\"/g, '');
        clean_airport = a[4].replace(/\r/g, '').replace(/\"/g, '');

        var options = {
          url: elasticsearch_url + '/flightdata/flightdata',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'airline': clean_airline,
            'airport': clean_airport,
            'delays': clean_delay_count
          })
        }

        request(options, function(error, response, body) {
          //if (error) {
          //    console.log('\n' + error);
          //  }
        });
      }
    }
  }
}

if (source && elasticsearch_url) {
  //clear_data();
  create_mapping();
  setTimeout(function() {
    searchData();
  }, 10000);
} else {
  console.log('\n[Error: Missing arguments!]\n');
}