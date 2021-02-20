import React, { useState } from 'react'
import queryString from 'query-string';
import axios from 'axios';

const SummonerPage = ({location, match}) => {
    const query = queryString.parse(location.search);
    let body = {
        name : query.userName
    }
    const [Tier, setTier] = useState("")
    const request = axios.post('/api/LandingPage', body)
    .then(response =>{
        let body = {
            encryptedSummonerId : response.data.data.id
        }
        axios.post('/api/SummonerPage',body)
        .then(response => {
            for(var i = 1; i <= response.data.length; i++){
                console.log(i)
            }
            // setTier(response.data.data[1].tier)
            console.log(response.data)
        })
    })
    return( 
        <div>
            <h1>{query.userName} 님의 소환사페이지입니다. </h1>
            <h4>{Tier}</h4>
        </div>
    )
}


export default SummonerPage
