import axios from 'axios';
import { SEARCH_SUMMONER} from './types';

export function searchSummoner(dataToSubmit){
    const request = axios.post('/api/LandingPage', dataToSubmit)
        .then(response => response.data)
        return {//reducer로 보내는거 이게 타
            type: SEARCH_SUMMONER,
            payload: request
        }
}