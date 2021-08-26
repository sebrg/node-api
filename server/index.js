const express = require('express')
const app = express()
const port = 3001
let cors = require('cors')
let getApi = require('./routes/GET')
let postApi = require('./routes/POST')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.use(cors())
app.use(express.json())
app.use('/api', getApi)
app.use('/api', postApi)
