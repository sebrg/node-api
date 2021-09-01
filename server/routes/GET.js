const fs = require('fs')
const express = require('express')
let router = express.Router()


router.get('/', (req, res) =>  {
    let rawData = fs.readFileSync("products.json")
    let products = JSON.parse(rawData)
    res.json(products)
})

router.get('/:product', (req, res) =>  {
    let rawData = fs.readFileSync("products.json")
    let products = JSON.parse(rawData)
    let Index = products.find(p => p.productname === req.params.product);
    if(Index) {
        res.json([Index]) //om produkten finns skicka tillbaks
    }
    else {
        res.json(products) //annars skicka hela listan
    }
})


module.exports = router