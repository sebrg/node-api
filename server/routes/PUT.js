const fs = require('fs') //för att spara i en json fil.. 
const express = require('express')
let router = express.Router()

router.put('/:selectedProduct', (req, res) =>  {
    let rawData = fs.readFileSync("products.json")
    let products = JSON.parse(rawData)
    
    let Index = products.findIndex(p => p.productname === req.params.selectedProduct);

    let newProduct = req.body
    products.splice(Index, 1, newProduct)
    
    fs.writeFileSync("products.json", JSON.stringify(products))
       
    return res.json(products)
})


module.exports = router