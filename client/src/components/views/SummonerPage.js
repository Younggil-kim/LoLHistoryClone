import React, {useState} from 'react'
import queryString from 'query-string';
import axios from 'axios'
const SummonerPage = ({location, match}) => {

    const query = queryString.parse(location.search);
    // console.log(query)
    const [summonerLevel, setsummonerLevel] = useState("")
    const [accountId, setaccountId] = useState("")
    const [summonerId, setsummonerId] = useState("")
    const [profileIconId, setprofileIconId] = useState("")
    const [imgUrl, setimgUrl] = useState("")

    const [soloTier, setsolotier] = useState("")
    const [soloLeaguePoint, setsololeaguePoint] = useState("")
    const [soloRank, setsoloRank] = useState("")
    const [soloWins, setsoloWins] = useState(0)
    const [soloLosses, setsoloLosses] = useState(0)

    const [flexTier, setflexTier] = useState("")
    const [flexLeaguePoint, setflexLeaguePoint] = useState("")
    const [flexRank, setflexRank] = useState("")
    const [flexWins, setflexWins] = useState(0)
    const [flexLosses, setflexLosses] = useState(0)

    const [soloTotal, setsoloTotal] = useState(0)
    const [flexTotal, setflexTotal] = useState(0)


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
        setprofileIconId(data.searchData.profileIconId)
        setimgUrl(`http://ddragon.leagueoflegends.com/cdn/6.3.1/img/profileicon/${profileIconId}.png`)
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
            if (data.searchData.length === 1){
                if (data.searchData[0].queueType === "RANKED_SOLO_5x5"){
                    setsolotier(data.searchData[0].tier)
                    setsololeaguePoint(data.searchData[0].leaguePoints)
                    setsoloRank(data.searchData[0].rank)
                    setsoloWins(data.searchData[0].wins)
                    setsoloLosses(data.searchData[0].losses)
                    setsoloTotal(Number(data.searchData[0].wins) + Number(data.searchData[0].losses))
                }else {
                    setflexTier(data.searchData[0].tier)
                    setflexLeaguePoint(data.searchData[0].leaguePoints)
                    setflexRank(data.searchData[0].rank)
                    setflexWins(data.searchData[0].wins)
                    setflexLosses(data.searchData[0].losses)
                    setflexTotal(Number(data.searchData[0].wins) + Number(data.searchData[0].losses))
                }
            } else if(data.searchData.length === 2){
                if (data.searchData[0].queueType === "RANKED_SOLO_5x5"){
                    setsolotier(data.searchData[0].tier)
                    setsololeaguePoint(data.searchData[0].leaguePoints)
                    setsoloRank(data.searchData[0].rank)
                    setsoloWins(data.searchData[0].wins)
                    setsoloLosses(data.searchData[0].losses)

                    setflexTier(data.searchData[1].tier)
                    setflexLeaguePoint(data.searchData[1].leaguePoints)
                    setflexRank(data.searchData[1].rank)
                    setflexWins(data.searchData[1].wins)
                    setflexLosses(data.searchData[1].losses)

                    setsoloTotal(Number(data.searchData[0].wins) + Number(data.searchData[0].losses))
                    setflexTotal(Number(data.searchData[1].wins) + Number(data.searchData[1].losses))
                }else {
                    setsolotier(data.searchData[1].tier)
                    setsololeaguePoint(data.searchData[1].leaguePoints)
                    setsoloRank(data.searchData[1].rank)
                    setsoloWins(data.searchData[1].wins)
                    setsoloLosses(data.searchData[1].losses)


                    setflexTier(data.searchData[0].tier)
                    setflexLeaguePoint(data.searchData[0].leaguePoints)
                    setflexRank(data.searchData[0].rank)
                    setflexWins(data.searchData[0].wins)
                    setflexLosses(data.searchData[0].losses)

                    setsoloTotal(Number(data.searchData[1].wins) + Number(data.searchData[1].losses))
                    setflexTotal(Number(data.searchData[0].wins) + Number(data.searchData[0].losses))
                }
            }  else{

            }


        })
    })  

    return (
        <div>
            <h2>{query.name}</h2>
            님의 소환사페이지입니다.
            <img src={imgUrl}></img>
            <br></br>
            소환사님의 레벨은 {summonerLevel && <span>{summonerLevel} 입니다.</span>}
            <br></br>
    {soloTier && <span>소환사님의 솔로랭크 티어는 {soloTier} {soloRank} {soloLeaguePoint}점 입니다. {soloTotal}전 {soloWins}승 {soloLosses}패</span>}
            <br></br>
    {flexTier && <span>소환사님의 자유랭크 티어는 {flexTier} {flexRank} {flexLeaguePoint}점 입니다. {flexTotal}전 {flexWins}승 {flexLosses}패</span>}
        
    <details>
    <summary>인게임 정보</summary>
            안녕하세요
    </details>  
        </div>
    )
}

export default SummonerPage