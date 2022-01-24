import React from "react"
import styles from '../style/App.module.css'
import PagingNumbers from './PagingNumber.js'

function Paging({checkPage, page, numberTasks}) {
    const arrPages = [];
    for(let i = 1; i <= numberTasks + 4; i++) {
        if (i % 5 === 0) {
            arrPages.push(i / 5);
        }
    }
    return(
        <div className={styles.pagingconteiner}>
            <input className={styles.pagingcolStart} type="button" value={'<'} onClick={checkPage}></input>
                {arrPages.map((item) => {
                    return (
                        <PagingNumbers 
                    checkPage={checkPage}
                    index={item}
                    key={item}
                    page={page}/>
                    )
                })}
            <input className={styles.pagingcolEnd} type="button" value={'>'} onClick={checkPage}></input>
        </div>
    )
}

export default Paging