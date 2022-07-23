FROM node

RUN npm install -g nodemon

WORKDIR /dockerapp

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "dev"]