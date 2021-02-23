import React, {useState} from 'react'
import queryString from 'query-string';
import axios from 'axios'
const SummonerPage = ({location, match}) => {

    const query = queryString.parse(location.search);
    // console.log(query)
    const [summonerLevel, setsummonerLevel] = useState("")
    const [accountId, setaccountId] = useState("")
    const [summonerId, setsummonerId] = useState("")
    const [tier, settier] = useState("")
    // console.log("검색하신 소환사 명은 ",query)
    // 받아와야할게 matchid => 이거로 최근 20개 전적을 뽑아와서, 뽑아낸 matchid로 그 게임 상세 정보를 가져오기
    // 
    const summonerV4 = new Promise((resolve, reject) => {
        try{
            const request = axios.post('/api/LandingPage/summoner/v4', query)
                .then(response => {return response.data})

            resolve(request)
            
        } catch(err){
            reject(new Error(err))
        }
    })
    summonerV4.then((data) => {
        console.log(data)
        setsummonerLevel(data.searchData.summonerLevel)
        setaccountId(data.searchData.accountId)
        setsummonerId(data.searchData.id)
        let id = {
            summonerId : data.searchData.id
        }
        const leagueV4 = new Promise((resolve, reject) => {
            try{
                const request = axios.post("/api/LandingPage/league/v4", id)
                    .then(response => {return response.data})
                resolve(request)
            } catch(err){
                reject(new Error(err))
            }
        })
        leagueV4.then((data) => {
            console.log(data)
            settier(data.searchData[0].tier)
        })
    })  

    return (
        <div>
            <h2>{query.name}</h2>
            님의 소환사페이지입니다.
            <br></br>
            소환사님의 레벨은 {summonerLevel && <span>{summonerLevel} 입니다.</span>}
            <br></br>
            소환사님의 티어는 {tier && <span>{tier} 입니다.</span>}
        </div>
    )
}

export default SummonerPage