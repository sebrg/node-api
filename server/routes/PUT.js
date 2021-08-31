const fs = require('fs') //för att spara i en json fil.. 
const express = require('express')
let router = express.Router()

router.put('/:prodId', (req, res) =>  {
    let rawData = fs.readFileSync("products.json")
    let products = JSON.parse(rawData)
    
    let Index = products.findIndex(p => p.id === req.params.prodId);

    req.body.id = req.params.prodId   
    products[Index].productname = req.body.productname
    products[Index].price = req.body.price
      
    fs.writeFileSync("products.json", JSON.stringify(products))
    return res.json(products)
    
       
})


module.exports = router