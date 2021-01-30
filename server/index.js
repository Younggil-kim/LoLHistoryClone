const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) =>{
    res.send("test success")
})

app.listen(port, () => {
    console.log("대기중입니다.")
})