const express = require('express')
const Function = require('./src/contractFunction')

const apiRouter = express.Router()

apiRouter
    .route('/getval')
    .get(Function.getValue)

apiRouter
    .route('/setval')
    .post(Function.setValue)

module.exports = apiRouter