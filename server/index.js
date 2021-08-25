const express = require('express')
const app = express()
const port = 3001
let cors = require('cors')
let testApiRouter = require('./routes/testApi')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use(express.json())
app.use(cors())
app.use('/testApi', testApiRouter)
