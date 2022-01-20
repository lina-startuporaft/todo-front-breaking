import React from "react"
import styles from '../style/App.module.css'
import PagingNumbers from './PagingNumber.js'

function Paging({tasks, checkPage, selectPage}) {
    return(
        <div className={styles.pagingconteiner}>
            <input className={styles.pagingcolStart} type="button" value={'<'}></input>
                {tasks.map((task, index) => {
                    if ((index % 5) == 0) {
                return <PagingNumbers 
                        index={index / 5 + 1}
                        checkPage={checkPage}
                        selectPage={selectPage}/>
                }})}
            <input className={styles.pagingcolEnd} type="button" value={'>'}></input>
        </div>
    )
}

export default Paging