const express = require('express')
const app = express()
const port = 5000
// const {API_KEY, API_URI} = require('./Config');
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');
const API_URI = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const API_KEY = 'RGAPI-82f4758c-58b6-43b7-898b-70109129867c';
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
    var name = req.body.name;
    name = encodeURI(name)
    console.log(req.body.name)
    try{
        const { data } = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`);
        return res.json({
            searchSuccess: true,
            searchData: data
        })
    } catch (error){
        return res.json({
            searchSuccess: false,
            message: "소환사명을 찾을 수 없습니다."
        })
    }

    // return res.json({
    //     searchSuccess: true,
    //     message: "search에 성공함",
    //     data : data
    // })
})


app.listen(port, () => {
    console.log("대기중입니다.")
})