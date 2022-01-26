import React, { useEffect, useState } from "react";
import styles from "../style/App.module.css"
// import 'antd/dist/antd.css'
import { Checkbox, Button, Row, Col, Input } from 'antd';



function Do({task, delDo, editTaskGlobal}) {

    const [count, setCount] = useState(task.title)
    const [currentFocus, setCurretFocus] = useState(false)

    useEffect(() => {
        setCount(task.title);
    }, [currentFocus]);

    const focusTask = () => {
        setCurretFocus(true);
    }

    const unFocusTask = () => {
        setCurretFocus(false);
        setCount(task.title);
    }

    const editTask = (e) => {
        setCount(e.target.value);
    }

    const chekEnterOrEsc = (e) => {
        if (e.key == 'Escape') {
            setCount(task.title);
            e.target.blur();
        } else if (e.key == 'Enter') {
            setCount(e.target.value);
            editTaskGlobal(e.target.value, e.target.id, task.checked);
            setCurretFocus(false);
            e.target.blur();
        }
    }

    const checkboxChange = (e) => {
        editTaskGlobal(count, task.id, e.target.checked)
    }

    return(
        <Row className={styles.do}>
            <Col span={1}>
            </Col>
            <Col span={2}>
                <Checkbox
                    className={styles.colcoldocheck}
                    onChange={checkboxChange}
                    name={task.id}
                    defaultChecked={task.checked}/>
            </Col>
            <Col span={15}>
                    <Input
                        onFocus={focusTask}
                        onBlur={unFocusTask}
                        onKeyUp={chekEnterOrEsc} 
                        className={styles.coldotask}
                        style={{border: "none"}}
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
                    className={styles.colcoldodel}
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