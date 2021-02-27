const express = require('express')
const app = express()
const port = 5000
const axios = require('axios')
const bodyParser = require('body-parser');
const API_KEY = 'RGAPI-92ab528e-a529-4fca-97c8-c6fb79199989';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('서버 생성')
})

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요')
})

app.post('/api/LandingPage/summoner/v4', async (req, res) =>{
    var name = req.body.name;
    name = encodeURI(name)
    // console.log(req.body)
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
})

app.post('/api/LandingPage/league/v4', async(req, res) => {
    id = req.body.summonerId
    // console.log(id)
    try{
        const { data } = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`);
        return res.json({
            searchSuccess: true,
            searchData: data
        })
    } catch (error){
        return res.json({
            searchSuccess: false,
            message: "티어 정보를 찾을 수 없습니다."
        })
    }
})

app.listen(port, () => {
    console.log("대기중입니다.")
})

