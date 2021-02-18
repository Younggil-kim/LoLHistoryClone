import React, {useState} from 'react'
import queryString from 'query-string';
import axios from 'axios'
const SummonerPage = ({location, match}) => {

    const query = queryString.parse(location.search);
    // console.log(query)
    const [summonerLevel, setsummonerLevel] = useState("")
    // console.log("검색하신 소환사 명은 ",query)
    
    const body = new Promise((resolve, reject) => {
        try{
            const request = axios.post('/api/LandingPage', query)
                .then(response => {return response.data})
            resolve(request)
            
        } catch(err){
            reject(new Error(err))
        }
    })
    body.then((data) => {
        console.log(data)
        setsummonerLevel(data.searchData.summonerLevel)
    })

    // const request = axios.post('/api/LandingPage', query)
    //     .then(response => response.data)
        
        // {
        //     if(response.data.searchSuccess){
        //         response.data.searchData
        //         // console.log(response.data.searchData)
        //         // console.log(response.data.searchData.name)
        //         // let data = response.data.searchData
        //         // console.log("검색은",data)
        //     } else{
        //         response.data.searchSuccess
        //         alert(`${response.data.message}`)
        //     }
        // })
        

    return (
        <div>
            <h2>{query.name}</h2>
            님의 소환사페이지입니다.
            <br></br>
    소환사님의 레벨은 {summonerLevel && <div>{summonerLevel} 입니다.</div>}
        </div>
    )
}

export default SummonerPage