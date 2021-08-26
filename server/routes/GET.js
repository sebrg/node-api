const fs = require('fs')
const express = require('express')
let router = express.Router()


router.get('/', (req, res) =>  {
    let rawData = fs.readFileSync("products.json")
    let products = JSON.parse(rawData)
    res.json(products)
})


module.exports = router