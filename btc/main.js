var request = require('request');
var elasticsearch = require('./elasticsearch');
const dateTime = require('node-datetime');

//elasticsearch server info
var elasticsearch_url = process.env.elasticsearch_url;

function get_BTC() {
  setTimeout(() => {
    request('https://api.coindesk.com/v1/bpi/currentprice.json', (error, response) => {
      const dt = dateTime.create();
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(response.body);
        dump_data(dt.format('Y-m-d H:M:S'), data.bpi.USD.rate.replace(',',''));
      } else {
        console.log('\nError connecting with server.');
      }
    });
    get_BTC();
  }, 30000);

}

function dump_data(date, usd) {
  elasticsearch.sendData(date, usd);
}

if (elasticsearch_url) {
  setTimeout(function() {
    elasticsearch.create_mapping();
    setTimeout(function() {
      console.log('\nStarted......');
      get_BTC();
    }, 10000);
  }, 60000);
} else {
  console.log('\n[Error: Missing arguments!]\n');
}