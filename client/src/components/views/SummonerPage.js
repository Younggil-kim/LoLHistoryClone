import React, {useEffect, useState} from 'react'
import queryString from 'query-string';
import axios from 'axios'
const SummonerPage = ({location, match}) => {

    const query = queryString.parse(location.search);
    const [Summoner, setSummoner] = useState({
        accountId: "",
        id: "",
        name: "",
        profileIconId: 0,
        puuid: "",
        revisionDate: 0,
        summonerLevel: 0
    })
    const [league, setleague] = useState([])
    const [soloRank, setsoloRank] = useState({rank : "", leaguePoints : 0, tier : ""})
    const [flexRank, setflexRank] = useState([])

    function setState (data) {
        setSummoner(Summoner => ({...Summoner, 
        accountId: data.searchData.accountId,
        id: data.searchData.id,
        name: data.searchData.name,
        profileIconId: data.searchData.profileIconId,
        puuid: data.searchData.puuid,
        revisionDate: data.searchData.revisionDate,
        summonerLevel: data.searchData.summonerLevel
        }))
    }
    useEffect(() => {
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
            setState(data)   
        })

    }, [])
    useEffect(() => {
        if (Summoner.summonerLevel){
            let id = {
                summonerId : Summoner.id
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
                console.log("a",data)
                setleague([...league, data.searchData])
                if (data.searchData[0].queueType === "RANKED_SOLO_5x5"){
                    setsoloRank({...soloRank, rank : data.searchData[0].rank, 
                        leaguePoints : data.searchData[0].leaguePoints,
                         tier : data.searchData[0].tier})
                }
            })
    }
    }, [Summoner])
    console.log("랜더링 되었어요")
    return (
        <div>
            <h2>{query.name} 님의 소환사페이지입니다. </h2>
            <br></br>
            {(Summoner.summonerLevel != 0) && <span>소환사님의 레벨은 {Summoner.summonerLevel} 입니다.</span>}
            <br></br>
            {(league.length != 0)&& <span>소환사님의 솔로 랭크 점수는 {soloRank.tier} {soloRank.rank} {soloRank.leaguePoints}점 입니다.</span>}
            {/* <br></br>

            소환사님의 솔로 랭크 티어는 {soloTier && <span>{soloTier}  {soloRank} {soloLeaguePoints} 입니다. {soloAll}전 {soloWins}승 {soloLoses}패 ({(soloWins/soloAll*100).toFixed(2)}%) </span>}
            <br></br>
            소환사님의 자유 랭크 티어는 {flexTier && <span>{flexTier}  {flexRank} {flexLeaguePoints} 입니다. {flexLosses+flexWins}전 {flexWins}승 {flexLosses}패 ({(flexWins/(flexWins+flexLosses)*100).toFixed(2)}%)</span>}
        <details> <summary> 인게임정보</summary>
             안녕하세요
        </details> */}
        </div>
    )
}

export default SummonerPage