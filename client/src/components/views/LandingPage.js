import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {searchSummoner} from '../../_actions/user_action'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom';
function LandingPage(props){
    // const dispatch = useDispatch();

    const [summonerName, setsummonerName] = useState("")
 
    const onSummonerHandler = (event) => {
        setsummonerName(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(summonerName)
        let body = {
            name : summonerName
        }
        
        console.log("검색하신 소환사 명은 ",body)
        const request = axios.post('/api/LandingPage', body)
            .then(response => console.log(response.data))
        props.history.push("/summoner")
        
        //dispatch(searchSummoner(body))
            
    }
    return (
        <div>
            <form style= {{ display: 'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <input type="text" value={summonerName} onChange= {onSummonerHandler}>
                    
                </input>
                <button type="submit">
                    GO!
                </button>
            </form>
        </div>
    )
}

export default LandingPage