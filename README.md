SECURITY PARKING

## Description

## Installation

```bash
$ make init
# Update env then:
$ docker compose up - d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migration

```bash
# install dev pacakges
$ npm i --include=dev

# create migration
$ npm run migrate:create --name=<nameTable>

# run migration
$ npm run migrate:run

# revert migration
$ npm run migrate:revert

```

## Run PM2

```bash
$ pm2 start ecosystem.config.js
```
