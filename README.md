# Mine data with Elasticsearch
<p align=center>

The purpose of this demo is to show how to feed data into Elasticsearch from API calls, Fluent, [Aircraft Delays](https://www.transtats.bts.gov), BitCoin price, and a desired Twitter hashtag for data analytics and then archive them to S3. This demo will run Fluentd, Elastisearch, Kibana, and the Minio S3 Server in a microservices architecture.

### Prerequisites

1. Docker for [Mac](https://download.docker.com/mac/stable/Docker.dmg) or [Windows](https://download.docker.com/win/stable/InstallDocker.msi).
2. This Git [Repo](https://github.com/rusher81572/elasticsearch-demo/archive/master.zip)
3. 3GB of RAM or greater for Docker
4. (Optional) [Twitter API credentials](https://dev.twitter.com/)

### Building the images
```
unzip elastic-demo-master.zip
cd elastic-demo-master
docker-compose build
```
If you want to use the Twitter app to mine data from Twitter, modify the twitter section of docker-compose.yml with
your developer API credentials.

### Starting the containers

```
docker-compose up -d
```

### Check the status of the containers
```
docker ps
```

You should see the following containers running:

```
ONTAINER ID        IMAGE                                    COMMAND                  CREATED             STATUS              PORTS                    NAMES
20e819e3013d        elasticsearchdemo_fluent                 "/bin/sh -c 'fluentd…"   32 seconds ago      Up 57 seconds                                elasticsearchdemo_fluent_1
72c2dc2b46cd        elasticsearchdemo_flight-delays          "/bin/sh -c 'sleep 1…"   36 seconds ago      Up 58 seconds                                elasticsearchdemo_flight-delays_1
f242786ac556        elasticsearchdemo_twitter                "/bin/sh -c 'npm ins…"   36 seconds ago      Up 59 seconds                                elasticsearchdemo_twitter_1
285b2513310f        elasticsearchdemo_elasticsearch-slave1   "/bin/sh -c 'bash /s…"   36 seconds ago      Up 59 seconds                                elasticsearchdemo_elasticsearch-slave1_1
adb148937fdd        elasticsearchdemo_elasticsearch-master   "/bin/sh -c 'bash /s…"   36 seconds ago      Up 58 seconds       0.0.0.0:9200->9200/tcp   elasticsearchdemo_elasticsearch-master_1
4dee1accb840        elasticsearchdemo_kibana                 "/bin/sh -c 'cd /kib…"   36 seconds ago      Up 58 seconds       0.0.0.0:5601->5601/tcp   elasticsearchdemo_kibana_1
273beef5e868        elasticsearchdemo_elasticsearch-slave2   "/bin/sh -c 'bash /s…"   36 seconds ago      Up 59 seconds                                elasticsearchdemo_elasticsearch-slave2_1
ab3f09566590        elasticsearchdemo_btc                    "/bin/sh -c 'npm ins…"   36 seconds ago      Up 57 seconds                                elasticsearchdemo_btc_1
2abb3f520561        elasticsearchdemo_minio                  "/bin/sh -c './minio…"   36 seconds ago      Up 59 seconds       0.0.0.0:9000->9000/tcp   elasticsearchdemo_minio_1
```

### Login to the Minio web console to see the logs
1. Goto http://127.0.0.1:9000 in your web browser
2. Login with accessKey1 for the username and verySecretKey1 for the password
3. After a few minutes, the Elasticsearch log files will start appearing there from Fluent.


### Accessing Kibana
1. Goto https://0.0.0.0:5601 in your web browser
2. Click the create button
3. Start analyzing data

The default index of ```logstash``` will show you the Elasticsearch logs. To view the logs, from the main Kibana screen click ```Connect to your Elasticsearch index``` and add ```logstash-*``` to the ```Index pattern``` text field. Click ```Next``` and choose ```@timestamp``` in the  ```Time filter field name```. When finished, click on the options or hamburger icon on the top-left part of the window and choose ```Discover```. Change the index to ```Twitter```. 

To view Twitter traffic, from the main Kibana screen click ```Connect to your Elasticsearch index``` and add ```twitter``` to the 'Index pattern' text field. When finished, click on the options or hamburger icon on the top-left part of the window and choose 'Discover'. Change the index to Twitter. 

To view Flight delay data, from the main Kibana screen click ```Connect to your Elasticsearch index``` and add ```flightdata``` to the ```Index pattern``` text field. When finished, click on the options or hamburger icon on the top-left part of the window and choose ```Discover```. Change the index to ```flightdata```. 

To view BitCoin price stats, from the main Kibana screen click ```Connect to your Elasticsearch index``` and add ```btc*``` to the ```Index pattern``` text field. When finished, click on the options or hamburger icon on the top-left part of the window and choose ```Discover```. Change the index to ```btc```. 

### Stopping and Erasing the demo

The following commands will stop and delete all running containers.

```
docker-compose kill
docker-compose rm -f
```

To start the demo again, simply run:
```
docker-compose up -d
```
