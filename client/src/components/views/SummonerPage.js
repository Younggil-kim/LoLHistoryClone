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
    const [SoloInfo, setSoloInfo] = useState({
        freshBlood: false,
        hotStreak: false,
        inactive: false,
        leagueId: "",
        leaguePoints: 0,
        losses: 0,
        queueType: "",
        rank: "",
        summonerId: "",
        summonerName: "",
        tier: "",
        veteran: false,
        wins: 0,
        total: 0
    })
    const [FlexInfo, setFlexInfo] = useState({
        freshBlood: false,
        hotStreak: false,
        inactive: false,
        leagueId: "",
        leaguePoints: 0,
        losses: 0,
        queueType: "",
        rank: "",
        summonerId: "",
        summonerName: "",
        tier: "",
        veteran: false,
        wins: 0,
        total: 0
    })
    // 받아와야할게 matchid => 이거로 최근 20개 전적을 뽑아와서, 뽑아낸 matchid로 그 게임 상세 정보를 가져오기
    //
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

    function setSolo(data){
        setSoloInfo(SoloInfo => ({...SoloInfo,
            freshBlood: data.freshBlood,
            hotStreak: data.hotStreak,
            inactive: data.inactive,
            leagueId: data.leagueId,
            leaguePoints: data.leaguePoints,
            losses: data.losses,
            queueType: data.queueType,
            rank: data.rank,
            summonerId: data.summonerId,
            summonerName: data.summonerName,
            tier: data.tier,
            veteran: data.veteran,
            wins: data.wins,
        }))
    }

    function setFlex(data){
        setFlexInfo(FlexInfo => ({...FlexInfo,
            freshBlood: data.freshBlood,
            hotStreak: data.hotStreak,
            inactive: data.inactive,
            leagueId: data.leagueId,
            leaguePoints: data.leaguePoints,
            losses: data.losses,
            queueType: data.queueType,
            rank: data.rank,
            summonerId: data.summonerId,
            summonerName: data.summonerName,
            tier: data.tier,
            veteran: data.veteran,
            wins: data.wins,
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
                summonerId: Summoner.id
            }
            console.log(id)
            const leagueV4 = new Promise ((resolve, reject) => {
                try{
                    const request = axios.post("/api/LandingPage/league/v4", id)
                    .then(response => {return response.data})
                    resolve(request)
                }catch(err){
                    reject(new Error(err))
                }
            })
            leagueV4.then((data) => {
                console.log(data)
                var dataLen = data.searchData.length
                for (var i=0; i<dataLen; i++){
                    if (data.searchData[i].queueType === "RANKED_SOLO_5x5"){
                        setSolo(data.searchData[i])
                    }
                    else{
                        setFlex(data.searchData[i])
                    }
                }
            })
        }
    }, [Summoner])
    return (
        <div>
            <h2>{query.name} 님의 소환사페이지입니다. </h2>
            <br></br>
            소환사님의 레벨은 {Summoner.summonerLevel && <span>{Summoner.summonerLevel} 입니다.</span>}
            <br></br>
            소환사님의 솔로 랭크 티어는 {SoloInfo.tier && <span> {SoloInfo.tier} {SoloInfo.rank} {SoloInfo.leaguePoints}입니다. {SoloInfo.wins + SoloInfo.losses}전 {SoloInfo.wins}승 {SoloInfo.losses}패 ({(SoloInfo.wins / (SoloInfo.wins + SoloInfo.losses) * 100).toFixed(2)}%)</span>}
            <br></br>
            소환사님의 자유 랭크 티어는 {FlexInfo.tier && <span> {FlexInfo.tier} {FlexInfo.rank} {FlexInfo.leaguePoints}입니다. {FlexInfo.wins + FlexInfo.losses}전 {FlexInfo.wins}승 {FlexInfo.losses}패 ({(FlexInfo.wins / (FlexInfo.wins + FlexInfo.losses) * 100).toFixed(2)}%)</span>}
            <br></br>
            <details> <summary> 인게임정보</summary>
             안녕하세요
        </details>
        </div>
    )
}

export default SummonerPage