const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const apis = require('./apis')

app.use(bodyParser.json())
app.use('/', apis)

app.listen(3000, () => {
    console.log(`app listening on port 3000`)
})