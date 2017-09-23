FROM alpine:edge

RUN apk add --no-cache mongodb && \
    rm /usr/bin/mongoperf

VOLUME ["/data/db"]

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017

COPY privileges.sh /root
RUN chmod +x /root/privileges.sh
ENTRYPOINT ["/root/privileges.sh"]

CMD ["mongod"]