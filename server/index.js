const express = require('express')
const app = express()
const port = 3001
let cors = require('cors')
let getApi = require('./routes/GET')
let postReq = require('./routes/POST')
let deleteReq = require('./routes/DELETE')
let updateReq = require('./routes/PUT')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.use(cors())
app.use(express.json())
app.use('/api', getApi)
app.use('/api', postReq)
app.use('/api', deleteReq)
app.use('/api', updateReq)
