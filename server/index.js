const express = require('express')
const app = express()
const port = 5000
// const {API_KEY, API_URI} = require('./Config');
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');
const API_URI = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const API_KEY = 'RGAPI-ba881d5f-d155-4ad6-be69-63f6a284425b';
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('서버생성됨')
})

app.post('/api/LandingPage/summoner/v4', async (req, res) =>{
    var name = req.body.name;
    name = encodeURI(name)
    console.log(req.body)
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
    console.log(id)
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
app.post('/api/LandingPage/matchList', async(req, res) => {
    accountId = req.body.accountId
    console.log(accountId)
    try{
        const { data } = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${API_KEY}`);
        return res.json({
            searchSuccess: true,
            searchData: data
        })
    } catch (error){
        return res.json({
            searchSuccess: false,
            message: "매치 리스트를 찾을 수 없습니다."
        })
    }
})

app.post('/api/LandingPage/gameid', async(req, res) => {


    matchId = req.body.gameId
    console.log(accountId)
    try{
        const { data } = await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${API_KEY}`);
        return res.json({
            searchSuccess: true,
            searchData: data
        })
    } catch (error){
        return res.json({
            searchSuccess: false,
            message: "해당하는 게임을 찾을 수 없습니다."
        })
    }
})




app.listen(port, () => {
    console.log("대기중입니다.")
})