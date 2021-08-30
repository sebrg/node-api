const fs = require('fs') //för att spara i en json fil.. 
const express = require('express')
let router = express.Router()

router.put('/:prodId', (req, res) =>  {
    let rawData = fs.readFileSync("products.json")
    let products = JSON.parse(rawData)
    
    let Index = products.findIndex(p => p.id === req.params.prodId);

    if(Index) {

        req.body.id = req.params.prodId 
        let updatedProduct = req.body
        products.splice(Index, 1, updatedProduct)
        
        fs.writeFileSync("products.json", JSON.stringify(products))
        return res.json(products)
    }
       else {
           return res.status(400).send("Update gone wrong..");
       }
})


module.exports = router