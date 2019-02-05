FROM node:10-slim

RUN mkdir /action-status
WORKDIR /action-status
COPY . .

RUN npm install --production

ENTRYPOINT ["./entrypoint.sh"]
CMD ["--help"]
