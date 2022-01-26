import React, { useEffect, useState } from "react";
import styles from "../style/App.module.css"
import 'antd/dist/antd.css'
import { Checkbox, Button, Row, Col } from 'antd';



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
        <Row className={styles.do}>
            <Col span={3}>
                <Checkbox
                    className={styles.colcoldo}
                    onChange={checkboxChange}
                    name={task.id}
                    defaultChecked={task.checked}/>
            </Col>
            <Col span={15}>
                {
                checkFocusTask?
                    <p 
                        className={styles.colcoldotask} 
                        onMouseDown={focusTask}>
                            {task.title}
                    </p>:
                    <input 
                        ref={refInput} 
                        onBlur={unFocusTask} 
                        onKeyUp={chekEnterOrEsc} 
                        className={styles.colcoldotask} 
                        defaultValue={task.title} 
                        id={task.id}
                        maxLength="70">
                        
                    </input>
                }
            </Col>
            <Col span={3}>
                <p className={styles.colcoldodate}>{task.date.slice(0, 10)}</p>
            </Col>
            <Col span={3}>
                <Button
                    danger
                    className={styles.colcoldo}
                    value='del' 
                    onClick={delDo}
                    id={task.id}>
                        Del
                </Button>
            </Col>
        </Row>
    )
}

export default Do