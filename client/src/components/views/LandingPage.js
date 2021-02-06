import React, {useEffect, useState} from 'react'
// import { API_KEY, API_URL } from '../../Config';
import axios from 'axios';
// import { response } from 'express';
// import { response } from 'express';

function LandingPage(props){

    const [summoner, setsummoner] = useState("")

    // function searchSummoner(dataTosubmit){
    //     const request = axios.post('/api/users/')
    // }

    const onSummonerHandler = (event) => {
        setsummoner(event.currentTarget.value)

    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            name : summoner
        }
        const request = axios.post('/api/LandingPage', body)
        .then (response => console.log(response.data))
        console.log(request)
    }


    return(
        <div>
            <form style={{display:'flex', flexDirection: 'column'}}
                onSubmit = {onSubmitHandler}
            > 
            <input type = 'summoner' value = {summoner} onChange={onSummonerHandler}/>
            <button type="submit">
                검색
            </button>
            </form>
        </div>
    )
}

export default LandingPage