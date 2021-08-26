const express = require('express')
const app = express()
const port = 3001
let cors = require('cors')
/* let bodyParser = require('body-parser') */
let getApi = require('./routes/endpointGet')
let postApi = require('./routes/endpointPost')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.use(cors())
/* app.use(bodyParser.json()) */
app.use(express.json())
app.use('/testApi', getApi)
app.use('/testApi', postApi)
