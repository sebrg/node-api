const fs = require('fs')
const express = require('express')
let router = express.Router()


router.delete('/:productName', (req, res) =>  {
    let rawData = fs.readFileSync("products.json")
    let products = JSON.parse(rawData)
    console.log(req.params.productName)
    
    const Index = products.findIndex(p => p.productname === req.params.productName);

    products.splice(Index, 1)
    fs.writeFileSync("products.json", JSON.stringify(products))
    
    return res.send(products)

})


module.exports = router