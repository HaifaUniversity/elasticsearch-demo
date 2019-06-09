#!/bin/bash
FILE='/configured.txt'

if [ ! -f "$FILE" ]
then
  echo 'network.host: ' `echo ${HOSTNAME}` >> /opt/elasticsearch*/config/elasticsearch.yml
  echo 'node.name: ' `echo ${name}` >> /opt/elasticsearch*/config/elasticsearch.yml
  echo 'discovery.zen.ping.unicast.hosts:' `echo $nodes` >> /opt/elasticsearch*/config/elasticsearch.yml
  echo 'cluster.initial_master_nodes: ["elasticsearch-master", "elasticsearch-slave1", "elasticsearch-slave2"]' >> /opt/elasticsearch*/config/elasticsearch.yml
  sed -i 's/2g/200m/g' /opt/elasticsearch*/config/jvm.options

  if [ "$mode" == "master" ]; then
  echo 'node.master: true' >> /opt/elasticsearch*/config/elasticsearch.yml
  echo 'node.data: true' >> /opt/elasticsearch*/config/elasticsearch.yml
  fi

  if [ "$mode" == "slave" ]; then
  echo 'node.data: true' >> /opt/elasticsearch*/config/elasticsearch.yml
  echo 'node.master: false' >> /opt/elasticsearch*/config/elasticsearch.yml
  fi
  touch /configured.txt
fi

su - elasticsearch -c "/opt/elasticsearch*/bin/elasticsearch"
