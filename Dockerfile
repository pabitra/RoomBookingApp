FROM node:10
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get update && apt-get install -y \
    postgresql-client
RUN mkdir /roombookingapp
ADD . /roombookingapp
WORKDIR /roombookingapp
RUN npm install knex -g
RUN npm i
EXPOSE 3000

RUN ["chmod", "+x", "./wait-for-postgres.sh"]
RUN ["chmod", "+x", "./start.sh"]
CMD ["npm", "start"]