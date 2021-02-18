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
        props.history.push(`/summoner?name=${body.name}`)


        
        //dispatch(searchSummoner(body))
            
    }
    return (
        <div>
            <form style= {{ display: 'flex', flexDirection:'column', width: '100%', height: '100vh', alignItems: 'center'}}
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