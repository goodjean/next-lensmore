FROM node:16

WORKDIR /usr/src

ENV DB_HOST=mysql
ENV DB_USER=root
ENV DB_PASSWORD=Op78520123!
ENV DB_DATABASE=crawler_test

COPY . .
RUN npm install
CMD ["npm", "run", "dev"]

# nextjs 파게이트 배포
# 테이블 다 날리고 못받아온 데이터베이스 데이터 다시 받아오기 컬럼 수정 후 다시 source


