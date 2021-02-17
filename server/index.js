const express = require('express')
const app = express()
const port = 5000
const axios = require('axios')
const bodyParser = require('body-parser');
const API_KEY = 'RGAPI-4ebcdabc-32b5-4d6c-969d-89fcdf476df3';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// const {API_KEY} = require('./Config');


app.get('/', (req, res) => {
    res.send('서버 생성')
})

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요')
})

app.post('/api/LandingPage', async (req, res) =>{
    const name = req.body.name;
    const URI_NAME = encodeURI(name);
    try{
        const { data } = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${URI_NAME}?api_key=${API_KEY}`);
        return res.json({
            searchSuccess: true,
            data: data
        })
    }catch(error){
        console.log(`${error}가 생성됨`)
        return res.json({
            searchSuccess: false,
            message: "소환사명을 찾을 수 없습니다."
        })
    }
    
    // console.log(data)
    // if (!error){
    //     res.send(data)
    // }
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

