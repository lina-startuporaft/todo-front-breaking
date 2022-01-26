import React, { useEffect, useState } from "react";
import styles from "../style/App.module.css"
import 'antd/dist/antd.css'
import { Checkbox, Button, Row, Col, Input } from 'antd';



function Do({task, delDo, checkboxChangeEdit, editTaskGlobal}) {

    const [count, setCount] = useState(task.title)
    const [currentFocus, setCurretFocus] = useState(false)

    useEffect(() => {
        setCount(task.title);
    }, [currentFocus]);

    const focusTask = () => {
        setCurretFocus(true);
    }

    function unFocusTask() {
        setCurretFocus(false);
        setCount(task.title);
    }

    const editTask = (e) => {
        setCount(e.target.value);
    }

    function chekEnterOrEsc(e) {
        if (e.key == 'Escape') {
            setCount(task.title);
            e.target.blur();
        } else if (e.key == 'Enter') {
            setCount(e.target.value);
            editTaskGlobal(e.target.value, e.target.id);
            setCurretFocus(false);
            e.target.blur()
        }
    }

    const checkboxChange = (e) => {
        checkboxChangeEdit(e, task.title)
    }

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
                    <Input
                        onFocus={focusTask}
                        onBlur={unFocusTask}
                        onKeyUp={chekEnterOrEsc} 
                        className={styles.colcoldotask}
                        id={task.id}
                        maxLength="70"
                        value={currentFocus ? count : task.title}
                        onChange={editTask}>
                    </Input>
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