import React, { useEffect, useState } from "react";
import styles from "../style/App.module.css"
import 'antd/dist/antd.css'
import { Checkbox, Button, Row, Col, Input, message } from 'antd';
import { CSSTransition } from 'react-transition-group'
import '../style/Animation.css'



function Do({task, delDo, editTaskGlobal}) {

    const [animation, setAnimation] = useState(false);
    const [animationEdit, setAnimationEdit] = useState(false);
    const [titleTask, setTitleTask] = useState(task.title)
    const [currentFocus, setCurretFocus] = useState(false)

    useEffect(() => {
        setAnimation(!animation);
        setAnimationEdit(false);
    }, [animationEdit])

    const focusTask = () => {
        setCurretFocus(true);
    }

    const unFocusTask = () => {
        setCurretFocus(false);
    }

    const chekEnterOrEsc = async (e) => {
        if (e.key === 'Escape') {
           unFocusTask();
        } else if (e.key === 'Enter') {
            if (e.target.value === '') {
                message.error('task must not be empty')
            } else {
                try {
                    await editTaskGlobal(e.target.value, e.target.id, task.checked);
                    setTitleTask(e.target.value);
                    e.target.blur();
                    setAnimationEdit(true);
                } catch(err) {
                    if (err.message == 'Request failed with status code 400') {
                        message.error('there is already a task');
                    } else {
                        message.error(`${err.name}:${err.message}`);
                    }
                }
            }
        }
    }

    const checkboxChange = (e) => {
        editTaskGlobal(task.title, task.id, e.target.checked)
    }   

    const delDoTask = (e) => {
        e.currentTarget.disabled = 'true';
        delDo(e);
        setAnimation(!animation);
    }

    return(
        <CSSTransition in={animation} classNames="animation" timeout={200}>
            <CSSTransition in={animationEdit} classNames="animationEdit" timeout={200}>
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
                            {
                                currentFocus ?
                                    <Input
                                        defaultValue={titleTask}
                                        className={styles.coldotask}
                                        onBlur={unFocusTask}
                                        onKeyUp={chekEnterOrEsc}
                                        id={task.id}
                                        autoFocus>
                                    </Input> 
                                :
                                    <p
                                        className={styles.coldotask} 
                                        onClick={focusTask}>
                                            {titleTask}
                                    </p>
                            }
                    </Col>
                    <Col span={3}>
                        <p className={styles.colcoldodate}>{task.date.slice(0, 10)}</p>
                    </Col>
                    <Col span={3}>
                        <Button
                            danger
                            className={styles.colcoldodel}
                            value='del' 
                            onClick={delDoTask}
                            id={task.id}>
                                Del
                        </Button>
                    </Col>
                </Row>
            </CSSTransition>
        </CSSTransition>
    )
}

export default Do