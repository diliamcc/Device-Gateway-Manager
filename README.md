# Device-Gateway-Manager

![Run Test](https://github.com/github/docs/actions/workflows/node.js.yml/badge.svg)

## Description

This project is a REST-API for managing gateways (master devices that control multiple peripheral devices). Implemented using express.js and mongoose.js

## Installation

```bash
# with npm
$ npm i
# with yarn (recomended)
$ yarn
```

## Testing the app

```bash
# all the tests
$ yarn test

# specific ones
$ yarn test name-of-the-test
```

## Running the app

```bash
# development | prod
$ yarn start

# generate the docs and start the app
$ yarn swagger-generate
```

## Swagger

```bash
# development | prod
$ yarn start

# explore:
http://{{HOST}}:{{PORT}}/v2/api-docs
```

## MongoDB setup

There is no difference on whether to use mongo locally or in a docker container, for both cases the mongo service must be running.

## Container setup

```bash
# (on linux or mac)

# this start the service on the background
$ sudo docker-compose up -d

# this start the service directly on the terminal
$ sudo docker-compose up
```
