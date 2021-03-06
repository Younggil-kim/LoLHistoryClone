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
    const [flexRank, setflexRank] = useState({rank : "", leaguePoints : 0, tier : ""})
    const [history, sethistory] = useState({matchHst : []})

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
                console.log("a",data.searchData)
                setleague([...league, data.searchData])
                if (data.searchData.length === 1){
                    if (data.searchData[0].queueType === "RANKED_SOLO_5x5"){
                        setsoloRank({...soloRank, 
                            rank : data.searchData[0].rank, 
                            leaguePoints : data.searchData[0].leaguePoints,
                            tier : data.searchData[0].tier})
                    }
                    else if (data.searchData[0].queueType === "RANKED_FLEX_SR"){
                        setflexRank({...flexRank, 
                            rank: data.searchData[0].rank,
                            leaguePoints : data.searchData[0].leaguePoints,
                            tier : data.searchData[0].tier})
                    }
                }else {
                    if (data.searchData[1].queueType === "RANKED_SOLO_5x5"){
                        setsoloRank({...soloRank, 
                            rank : data.searchData[1].rank, 
                            leaguePoints : data.searchData[1].leaguePoints,
                            tier : data.searchData[1].tier})
                    }
                    else if (data.searchData[1].queueType === "RANKED_FLEX_SR"){
                        setflexRank({...flexRank, 
                            rank: data.searchData[1].rank,
                            leaguePoints : data.searchData[1].leaguePoints,
                            tier : data.searchData[1].tier})
                    }
                }
            })
    }
    }, [Summoner])

    useEffect(() => {
        if (Summoner.summonerLevel){
            let accountId = {
                accountId : Summoner.accountId
            }
            const matchList = new Promise((resolve, reject) => {
                try{
                    const request = axios.post("/api/LandingPage/matchList", accountId)
                        .then(response => {return response.data})
                    resolve(request)
                } catch(err){
                    reject(new Error(err))
                }
            })
            matchList.then((data) => {
                sethistory({...history, matchHst : JSON.parse(JSON.stringify(data.searchData.matches))})
            })
    }
    }, [Summoner])
 
    useEffect(() => {
        if (history.matchHst.length != 0){
            let gameId = {
                gameId : history.matchHst[0].gameId
            }
        const gameInfo = new Promise((resolve, reject) => {
            try{
                const request = axios.post("/api/LandingPage/gameid", gameId)
                    .then(response => {return response.data})
                resolve(request)
            } catch(err){
                reject(new Error(err))
            }
        })
        gameInfo.then((data) => {
            setgame([...game, data.searchData.participants])
        })
    }
    }, [history])
    const [game, setgame] = useState([])


    console.log("랜더링 되었어요")
    console.log(history.matchHst)
    console.log("game 정보는",game)
    
    console.log("0 정보는",typeof(game))
    console.log("1 정보는",typeof(game[0]))
    console.log("2 정보는",game[0])
    const kills = game.map((obj) => Object.values(obj)[0].stats.kills);
    const deaths =game.map((obj) => Object.values(obj)[0].stats.deaths);
    const assists =game.map((obj) => Object.values(obj)[0].stats.assists);
    console.log("결과값",kills, deaths, assists);
    // console.log("첫 참가자 정보는",game[0])
    return (
        <div>
            <h2>{query.name} 님의 소환사페이지입니다. </h2>
            <br></br>
            {(Summoner.summonerLevel != 0) && <span>소환사님의 레벨은 {Summoner.summonerLevel} 입니다.</span>}
            <br></br>
            {(league.length != 0)&& <span>소환사님의 솔로 랭크 점수는 {soloRank.tier} {soloRank.rank} {soloRank.leaguePoints}점 입니다.</span>}
            <br></br>
            {(league.length != 0)&& <span>소환사님의 자유 랭크 점수는 {flexRank.tier} {flexRank.rank} {flexRank.leaguePoints}점 입니다.</span>}
            <br></br>
            {(history.matchHst.length != 0) && <span>사용한 챔피언 번호 :  {history.matchHst[0].champion}</span>}
            <br></br>
            {<span>최근 20 게임</span>}
            <br></br>
            {(game.length != 0) && <span>{kills}/{deaths}/{assists}</span>}
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