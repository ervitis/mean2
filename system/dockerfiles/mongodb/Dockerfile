FROM alpine:edge

RUN apk add --no-cache mongodb && \
    rm /usr/bin/mongoperf

VOLUME ["/data/db"]

# Expose ports.
#   - 27017: process
#   - 28017: http

ARG MONGODB_PORT_LISTENING
ARG MONGODB_PORT_HTTP

ENV PORT_LISTENING=${MONGODB_PORT_LISTENING}
ENV PORT_HTTP=${MONGODB_PORT_HTTP}

EXPOSE ${PORT_LISTENING}
EXPOSE ${PORT_HTTP}

COPY privileges.sh /root
RUN chmod +x /root/privileges.sh
ENTRYPOINT ["/root/privileges.sh"]

CMD ["mongod"]