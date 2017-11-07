# Mine data with Elasticsearch
<p align=center>

The purpose of this demo is to show how to feed data into Elasticsearch from API calls, Fluent, [Aircraft Delays](https://www.transtats.bts.gov), and a desired Twitter hashtag for data analytics and then archive them to S3. This demo will run Fluentd, Elastisearch, Kibana, and the Minio S3 Server in a microservices architecture.

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
CONTAINER ID        IMAGE                                    COMMAND                  CREATED             STATUS                         PORTS                    NAMES
af7a43867287        elasticsearchdemo_fluent                 "/bin/sh -c 'fluen..."   3 minutes ago       Up 3 minutes                                            elasticsearchdemo_fluent_1
cfbcca83cdc5        elasticsearchdemo_elasticsearch-slave1   "/bin/sh -c 'bash ..."   3 minutes ago       Up 3 minutes                                            elasticsearchdemo_elasticsearch-slave1_1
2889f488fd10        elasticsearchdemo_minio                  "/bin/sh -c './min..."   3 minutes ago       Up 3 minutes                   0.0.0.0:9000->9000/tcp   elasticsearchdemo_minio_1
60409ed7ad0b        elasticsearchdemo_elasticsearch-master   "/bin/sh -c 'bash ..."   3 minutes ago       Up 3 minutes                   0.0.0.0:9200->9200/tcp   elasticsearchdemo_elasticsearch-master_1
3020a31be312        elasticsearchdemo_twitter                "/bin/sh -c 'npm i..."   3 minutes ago       Restarting (0) 6 seconds ago                            elasticsearchdemo_twitter_1
2bce7806889c        elasticsearchdemo_elasticsearch-slave2   "/bin/sh -c 'bash ..."   3 minutes ago       Up 3 minutes                                            elasticsearchdemo_elasticsearch-slave2_1
01469f4e264b        elasticsearchdemo_kibana                 "/bin/sh -c 'cd /k..."   3 minutes ago       Up 3 minutes                   0.0.0.0:5601->5601/tcp   elasticsearchdemo_kibana_1
```

### Login to the Minio web console to see the logs
1. Goto http://127.0.0.1:9000 in your web browser
2. Login with accessKey1 for the username and verySecretKey1 for the password
3. After a few minutes, the Elasticsearch log files will start appearing there from Fluent.


### Accessing Kibana
1. Goto https://0.0.0.0:5601 in your web browser
2. Click the create button
3. Start analyzing data

The default index of "logstash" will show you the Elasticsearch logs.

To view Twitter traffic, change the index to twitter or go to Management->Index Patterns-> + and then add twitter. Uncheck 'Index contains time-based events'.

To view Flight delay data, change the index to flightdata or go to Management->Index Patterns-> + and then add flightdata. Uncheck 'Index contains time-based events'.

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
