import React from "react"
import styles from '../style/App.module.css'
import PagingNumbers from './PagingNumber.js'

function Paging({checkPage}) {
    const arrPages = [];
    for(let i = 1; i <= 10; i++) {
        arrPages.push(i);
    }
    console.log(arrPages);
    return(
        <div className={styles.pagingconteiner}>
            <input className={styles.pagingcolStart} type="button" value={'<'} onClick={checkPage}></input>
                {arrPages.map((item) => {
                    return (
                        <PagingNumbers 
                    checkPage={checkPage}
                    index={item}/>
                    )
                })}
            <input className={styles.pagingcolEnd} type="button" value={'>'} onClick={checkPage}></input>
        </div>
    )
}

export default Paging