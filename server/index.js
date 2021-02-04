const express = require('express')
const app = express()
const port = 5000
const axios = require('axios')
// const {API_KEY} = require('./Config');
app.get('/', async (req, res) =>{
    res.send("test success")
    const name = 'Agnes sengA';
    const { data } = await axios.get(`https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=RGAPI-5bfd95d9-d1b9-403c-92c4-e4a3f3de06c3`);
    console.log(data)
})


app.listen(port, () => {
    console.log("대기중입니다.")
})

