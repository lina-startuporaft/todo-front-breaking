import React from "react"
import styles from '../style/App.module.css'

function Paging({index,checkPage}) {
    return(
            <input
                className={styles.pagingcol} 
                type="button" 
                value={index} 
                onClick={checkPage}>
            </input>
    )
}

export default Paging