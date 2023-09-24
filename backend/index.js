const http = require('http')
const express = require('express')
const app = express()
const apiRouter = require('./routers')

app.use(express.json())

app.use('/api', apiRouter)

app.listen(3000, () => {
    console.log("Server is running at 3000")
})