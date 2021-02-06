const express = require('express')
const app = express()
const port = 5000
const axios = require('axios')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// const {API_KEY} = require('./Config');


app.post('/api/LandingPage', async (req, res) =>{
    const name = req.body.name;
    console.log(req.body.name)
    const { data } = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-1483410c-8744-49f1-a761-4c286c5c2fc7`);
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

// app.get('/api/hello', (req, res) => {
//     res.send('안녕하세요')
// })