import React from "react"
import styles from '../style/App.module.css'

function Paging({index,checkPage, page}) {
    return(
            <input
                className={styles.pagingcol} 
                type="button" 
                value={index} 
                onClick={checkPage}
                style={(page == index)?{backgroundColor: '#6ccf71'}:null} >
            </input>
    )
}

export default Paging