const express = require('express')
const app = express()
const port = 5000
// const {API_KEY, API_URI} = require('./Config');
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');
const API_URI = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const API_KEY = 'RGAPI-1483410c-8744-49f1-a761-4c286c5c2fc7';
const name = 'hide on bush'
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('서버생성됨')
})

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요')
})

app.post('/api/LandingPage', async (req, res) =>{
    const name = req.body.name;
    console.log(req.body.name)
    const { data } = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`);
    console.log(data)
    res.send(data)
    // return res.json({
    //     searchSuccess: true,
    //     message: "search에 성공함",
    //     data : data
    // })
})


app.listen(port, () => {
    console.log("대기중입니다.")
})