FROM alpine
RUN apk update;apk add ruby ruby-dev ruby-rdoc ruby-irb alpine-sdk
RUN gem install fluentd -v "~> 0.12.0"
RUN fluent-gem install fluent-plugin-td fluent-plugin-s3 fluent-plugin-elasticsearch
ADD fluentd.conf /fluent/fluentd.conf
CMD fluentd -c /fluent/fluentd.conf
