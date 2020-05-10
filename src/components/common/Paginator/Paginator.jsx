import React, { useState } from 'react'
import s from '../../Users/Users.module.css'

let Paginator = ({ portionSize = 10 , ...props}) => {
    console.log(props)
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize )
    let [portionNumber, setPortionNumber] = useState(2)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div>
            { 
                portionNumber > 1 && 
                <button onClick={() => setPortionNumber(portionNumber - 1)}> PREV </button>
            }
            {
                pages
                    .filter((numberPage) => numberPage >= leftPortionPageNumber && numberPage <= rightPortionPageNumber)
                    .map(i => {
                    return <span onClick={() => props.onPageChanged(i)} key={i} className={(props.currentPage === i) ? s.selectedPage : ''}>{i}</span>
                })
            }
            { 
                portionCount > portionNumber && 
                <button onClick={() => setPortionNumber(portionNumber + 1)}> NEXT </button>
            }
        </div>
}

export default Paginator