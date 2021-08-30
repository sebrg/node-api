const fs = require('fs') //för att spara i en json fil.. 
const { v4: uuidv4 } = require('uuid'); //generera id 
const express = require('express')
let router = express.Router()

router.put('/:prodId', (req, res) =>  {
    let rawData = fs.readFileSync("products.json")
    let products = JSON.parse(rawData)
    
    let Index = products.findIndex(p => p.id === req.params.prodId);
    req.body.id = uuidv4() 
    let newProduct = req.body
    products.splice(Index, 1, newProduct)
    
    fs.writeFileSync("products.json", JSON.stringify(products))
       
    return res.json(products)
})


module.exports = router