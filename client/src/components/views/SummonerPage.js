import React from 'react'
import queryString from 'query-string';

const SummonerPage = ({location, match}) => {
    const query = queryString.parse(location.search);
    console.log(query)
    return(
        <div>
            <h2>{query.userName}</h2>
            님의 소환사페이지입니다.
        </div>
    )
}

// function SummonerPage(){
//     console.log(queryString.parse(location.search))
//     return (
//         <div>
//             소환사페이지입니다.
//         </div>
//     )
// }

export default SummonerPage
