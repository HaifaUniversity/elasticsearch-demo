FROM alpine
RUN apk update;apk add git alpine-sdk nodejs nodejs-npm python alpine-sdk
RUN npm -g install yarn
RUN git clone --depth 1 -b 6.4 https://github.com/elastic/kibana.git
RUN cd /kibana;node -v | cut -c 2-10 > .node-version;yarn kbn bootstrap;yarn install
RUN sed -i 's/#server.host: "localhost"/server.host: "0.0.0.0"/i' /kibana/config/kibana.yml
RUN sed -i 's/#elasticsearch.url: "http:\/\/localhost:9200"/elasticsearch.url: "http:\/\/elasticsearch-master:9200"/i' /kibana*/config/kibana.yml
RUN sed -i 's/#server.port: 5601/server.port: 5601/i' /kibana/config/kibana.yml
RUN sed -i 's/#elasticsearch.requestTimeout: 30000/elasticsearch.requestTimeout: 120000/i' /kibana/config/kibana.yml
CMD cd /kibana;yarn start
