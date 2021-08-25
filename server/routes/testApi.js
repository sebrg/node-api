const express = require('express')
let router = express.Router()


router.get('/', (req, res) =>  {
    res.json('API is working')
})


module.exports = router