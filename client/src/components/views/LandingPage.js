import React, {useEffect, useState} from 'react'
import {API_KEY, API_URI} from '../../Config'

function LandingPage(){

    useEffect(() => {
        const name = 'hide on bush'
        const endpoint = `${API_URI}${name}?api_key=${API_KEY}`;

        fetch(endpoint)
        .then(response => response.json())
        .then(response => console.log(response))
    }, [])

    return (
        <div>
            소환사 이름입력하세요.
        </div>
    )
}

export default LandingPage