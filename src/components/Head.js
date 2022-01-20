import React, {useState} from "react";
import styles from '../style/App.module.css'
import ToDo from '../image/to-do.jpg'
import Sort from '../image/sort.jpg'

function Head({addDo, sortDoUp, sortDoDown, seeDone, seeUndone, seeAll, activeSee, activeSort}) {
    const [count, setCount] = useState('');
    const [id, setId] = useState(1);

    function editChange(e) {
        setCount(e.currentTarget.value);
    }

    function chekEnter(e) {
        if (e.key == 'Enter') {
            addDo({count, id});
            e.currentTarget.value = '';
            setCount('');
            setId(id + 1);
        }
    }

    return(
            <div className={styles.head_container}>
                <div className={styles.head}>
                    <div className={styles.row}>
                        <div className={styles.colSpan3}></div>
                        <img src={ToDo} alt="To Do" className={styles.colSpan4}/>
                        <div className={styles.colSpan3}></div>
                    </div>
                    <div className={styles.row}>
                        <input className={styles.colSpan1} type="text" onChange={editChange} onKeyUp={chekEnter}/>
                    </div>
                    <div className={styles.row}>
                        <input  className={styles.col} type="button" value="All" style={activeSee[0]} onClick={seeAll}/>
                        <input  className={styles.col} type="button" value="Done" style={activeSee[1]} onClick={seeDone}/>
                        <input className={styles.col} type="button" value="Undone" style={activeSee[2]} onClick={seeUndone}/>
                        <div className={styles.col}></div>
                        <img src={Sort} alt="Sort" className={styles.colSpan2}/>
                        <input className={styles.colSpan5} type="button" value="new" style={activeSort[0]} onClick={sortDoDown}/>
                        <input className={styles.colSpan5} type="button" value="old" style={activeSort[1]} onClick={sortDoUp}/>
                    </div>
                </div>
            </div>
    )
}

export default Head 