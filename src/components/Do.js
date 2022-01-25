import React, { useEffect, useState } from "react";
import styles from "../style/App.module.css"
import 'antd/dist/antd.css'
import { Checkbox, Button } from 'antd';



function Do({task, delDo, checkboxChangeEdit, editTask}) {

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
            editTask(e);
            unFocusTask();
        }
    }

    const checkboxChange = (e) => {
        checkboxChangeEdit(e, task.title)
    }

    useEffect(() => {if (checkFocusTask == false) {refInput.current.focus()}},[checkFocusTask])

    return(
        <div className={styles.do}>
            <Checkbox
                className={styles.coldoCol1}
                onChange={checkboxChange}
                name={task.id}
                defaultChecked={task.checked}/>
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
                    id={task.id}
                    maxLength="70">
                    
                </input>
            }
            <p className={styles.coldoCol3}>{task.date.slice(0, 10)}</p>
            <Button
                danger
                className={styles.coldoCol4} 
                value='del' 
                onClick={delDo}
                id={task.id}>
                    Del
            </Button>
        </div>
    )
}

export default Do