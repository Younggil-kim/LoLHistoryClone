const express = require('express')
const app = express()
const port = 5000
// const {API_KEY, API_URI} = require('./Config');
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');
const API_URI = 'http://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const API_KEY = 'RGAPI-5bfd95d9-d1b9-403c-92c4-e4a3f3de06c3';
const name = 'hide on bush'
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.get('/', async (req, res) =>{
    res.send("test success")
    const name = 'Agnes sengA';
    const { data } = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-5bfd95d9-d1b9-403c-92c4-e4a3f3de06c3`);
    console.log(data)
})


app.listen(port, () => {
    console.log("대기중입니다.")
})