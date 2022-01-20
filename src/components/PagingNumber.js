import React from "react"
import styles from '../style/App.module.css'

function Paging({index,checkPage, selectPage}) {
    return(
            <input
                className={(selectPage == index)? styles.pagingcolselect:styles.pagingcol} 
                type="button" 
                value={index} 
                onClick={checkPage}>
            </input>
    )
}

export default Paging