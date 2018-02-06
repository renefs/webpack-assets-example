FROM node:6.10

EXPOSE 2992

WORKDIR /code

ADD ./package.json /code
RUN npm install

ADD ./webpack.config.js /code
COPY ./assets /code/assets/
COPY ./build /code/build/
ADD ./index.html /code

CMD ["npm", "run", "start"]