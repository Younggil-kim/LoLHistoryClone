// import { response } from 'express';
import React, {useEffect, useState} from 'react'
import { API_KEY, API_URL } from '../../Config';

function LandingPage(){
    const name = 'Agnes sengA';
    useEffect(() => {
        const endpoint = `${API_URL}/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`;

        fetch(endpoint)
        .then(response => response.json())
        .then(response => console.log(response))
    }, [])
    return (
        <div>
            안녕하세요
        </div>
    )
}

export default LandingPage