const fs = require('fs') //för att spara i en json fil.. 
const express = require('express')
let router = express.Router()
const { v4: uuidv4 } = require('uuid'); //generera id 



router.post('/', (req, res) =>  {
    let rawData = fs.readFileSync("products.json")
    let products = JSON.parse(rawData)
    req.body.id = uuidv4() 
    products.push(req.body)
    fs.writeFileSync("products.json", JSON.stringify(products))
    console.log(products)
    res.json(products)
})


module.exports = router