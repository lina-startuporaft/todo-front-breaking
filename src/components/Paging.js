import React from "react"
import styles from '../style/App.module.css'
import PagingNumbers from './PagingNumber.js'

function Paging({tasks, checkPage, selectPage}) {


    
    return(
        <div className={styles.pagingconteiner}>
            <input className={styles.pagingcolStart} type="button" value={'<'} onClick={checkPage}></input>
                {tasks.map((task, index) => {
                    if ((selectPage <= 5) && ((index % 5) == 0) && (index < 45)) {
                return <PagingNumbers 
                        index={index / 5 + 1}
                        checkPage={checkPage}
                        selectPage={selectPage}/>
                    } else if ((selectPage > ((tasks.length - 20) /5)) && ((index % 5) == 0) && (index >= (tasks.length - 45))) {
                return <PagingNumbers 
                        index={index / 5 + 1}
                        checkPage={checkPage}
                        selectPage={selectPage}/>
                    } else if (((index % 5) == 0) && (index > selectPage * 5 - 30) && (index < selectPage * 5 + 20)) {
                return <PagingNumbers 
                        index={index / 5 + 1}
                        checkPage={checkPage}
                        selectPage={selectPage}/>     
                    }
                })}
            <input className={styles.pagingcolEnd} type="button" value={'>'} onClick={checkPage}></input>
        </div>
    )
}

export default Paging