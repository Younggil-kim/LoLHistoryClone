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
        axios.post('/api/LandingPage', body)
            .then(response => {
                if(response.data.searchSuccess){
                    console.log(response.data)
                    props.history.push(`/summoner?name=${body.name}`)
                    
                } else{
                    alert(`${response.data.message}`)
                }
            })
        
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