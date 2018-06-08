#FROM arm32v7/ubuntu
FROM ubuntu
WORKDIR /opt
RUN echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN apt-get update;apt-get install software-properties-common -y;add-apt-repository ppa:webupd8team/java
RUN apt-get update;apt-get install -y tar wget oracle-java8-installer
RUN wget -q -O eleastic-search.tar.gz https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.2.4.tar.gz
RUN tar xf eleastic-search.tar.gz -C /opt/
RUN useradd -s /bin/bash elasticsearch -d /home/elasticsearch -m
RUN chown -R elasticsearch:elasticsearch /opt/elasticsearch*
RUN sed -i 's/-Xms1g/-Xms300m/g' /opt/elasticsearch-6.2.4/config/jvm.options && sed -i 's/-Xmx1g/-Xmx300m/g' /opt/elasticsearch-6.2.4/config/jvm.options
RUN sed -i 's/#bootstrap.memory_lock: true/bootstrap.system_call_filter: false/i' /opt/elasticsearch*/config/elasticsearch.yml
RUN mkdir /opt/elasticsearch-6.2.4/tmp
RUN echo "-Djna.tmpdir=/opt/elasticsearch-6.2.4/tmp" >> /opt/elasticsearch-6.2.4/config/jvm.options
ADD start.sh /
CMD bash /start.sh
