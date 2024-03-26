FROM node:16

WORKDIR /usr/src

RUN apt-get update && \
    apt-get install -y python3-pip && \
    pip3 install awscli

COPY . .
RUN npm install
CMD ["npm", "run", "dev"]



