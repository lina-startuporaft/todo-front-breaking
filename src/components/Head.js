import React, {useState} from "react";
import styles from '../style/App.module.css'
import ToDo from '../image/to-do.jpg'
import Sort from '../image/sort.jpg'

function Head({addDo, sort , currentFilter, filterBy, orderBy}) {
    const [count, setCount] = useState('');

    function editChange(e) {
        setCount(e.currentTarget.value);
    }

    function chekEnter(e) {
        if (e.key == 'Enter') {
            addDo({count});
            e.currentTarget.value = '';
            setCount('');
        }
    }

    let activeFilter = [];
    const activeColor = {backgroundColor: '#6ccf71'};
    switch (filterBy) {
        case ('all'):
            activeFilter[0] = activeColor;
            break;
        case ('done'):
            activeFilter[1] = activeColor;
            break;
        case ('undone'):
            activeFilter[2] = activeColor;
            break;
    }

    let activeSort = [];
    switch (orderBy) {
        case ('desc'):
            activeSort[0] = activeColor;
            break;
        case ('asc'):
            activeSort[1] = activeColor;
            break;
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
                        <input className={styles.colSpan1} maxLength="70" type="text" onChange={editChange} onKeyUp={chekEnter}/>
                    </div>
                    <div className={styles.row}>
                        <input  className={styles.col} style={activeFilter[0]} type="button" value="all" onClick={currentFilter}/>
                        <input  className={styles.col} style={activeFilter[1]} type="button" value="done" onClick={currentFilter}/>
                        <input className={styles.col} style={activeFilter[2]} type="button" value="undone" onClick={currentFilter}/>
                        <div className={styles.col}></div>
                        <img src={Sort} alt="Sort" className={styles.colSpan2}/>
                        <input className={styles.colSpan5}  style={activeSort[0]} type="button" value="desc" onClick={sort}/>
                        <input className={styles.colSpan5}  style={activeSort[1]} type="button" value="asc" onClick={sort}/>
                    </div>
                </div>
            </div>
    )
}

export default Head