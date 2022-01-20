import React, { useEffect, useState } from "react";
import styles from "../style/App.module.css"

function Do({task, delDo, checkStateChekbox}) {

    const [checkFocusTask, setCheckFocusTask] = useState(true)
    
    const refInput = React.createRef();

    function focusTask(e) {
        if (e.button == 0){
            setCheckFocusTask(false);
        }
    }

    function unFocusTask() {
        setCheckFocusTask(true);
    }

    function chekEnterOrEsc(e) {
        if (e.key == 'Escape') {
            unFocusTask();
        } else if (e.key == 'Enter') {
            task.title = refInput.current.value;
            unFocusTask();
        }
    }

    useEffect(() => {if (checkFocusTask == false) {refInput.current.focus()}},[checkFocusTask])

    return(
        <div className={styles.do}>
            <input type="checkbox" className={styles.coldoCol1} onChange={checkStateChekbox} checked={task.checked} id={task.id}/>
            {
            checkFocusTask?
                <p 
                    className={styles.coldoCol2} 
                    onMouseDown={focusTask}>
                        {task.title}
                </p>:
                <input 
                    ref={refInput} 
                    onBlur={unFocusTask} 
                    onKeyUp={chekEnterOrEsc} 
                    className={styles.coldoCol2} 
                    defaultValue={task.title} 
                    id={task.id}>
                </input>
            }
            <p className={styles.coldoCol3}>12/01/2022</p>
            <input className={styles.coldoCol4} type="button" value='del' onClick={delDo} id={task.id}/>
        </div>
    )
}

export default Do