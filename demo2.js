const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'demo2')))
app.listen(3002, () => console.log('Example app listening on port 3002!'))