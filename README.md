# Device-Gateway-Manager

[![Run tests](https://github.com/diliamcc/Device-Gateway-Manager/actions/workflows/node.js.yml/badge.svg)](https://github.com/diliamcc/Device-Gateway-Manager/actions/workflows/node.js.yml)

## Description

This project is a REST-API for managing gateways (master devices that control multiple peripheral devices). Implemented using express.js and mongoose.js

## Installation

```bash
# with npm
$ npm install
# with yarn 
$ yarn
```

## Testing the app

```bash
# all the tests
#with npm
$npm test 
#with yarn
$ yarn test

# specific ones
$ yarn test name-of-the-test
```
<br>

## Postman test use

See the postman use [here](/api-colection/README.md).
<br><br>

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


