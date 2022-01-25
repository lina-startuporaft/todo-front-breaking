import React, {useState} from "react";
import styles from '../style/App.module.css'
import ToDo from '../image/to-do.jpg'
import 'antd/dist/antd.css'
import { Button, Input, Row, Col } from 'antd';

function Head({addDo, sort , currentFilter, filterBy, orderBy}) {
    const [count, setCount] = useState('');

    function editChange(e) {
        setCount(e.target.value);
    }

    function chekEnter(e) {
        if (e.key == 'Enter') {
            addDo({count});
            setCount('');
        }
    }

    let activeFilter = [];
    const activeColor = {backgroundColor: '#a7d8a5'};
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
                    <Row>
                        <Col span={8}>
                            <div className={styles.colcol}/>
                        </Col>
                        <Col span={8}>
                            <img className={styles.colcol} src={ToDo} alt="To Do"/>
                        </Col>
                        <Col span={8}>
                            <div className={styles.colcol}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Input className={styles.colcol} maxLength="70" type="text" value={count} onChange={editChange} onKeyUp={chekEnter} placeholder="I will..."/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <Button className={styles.colcol} style={activeFilter[0]} type="button" value="all" onClick={currentFilter}>All</Button>
                        </Col>
                        <Col span={4}>
                            <Button className={styles.colcol} style={activeFilter[1]} type="button" value="done" onClick={currentFilter}>Done</Button>
                        </Col>
                        <Col span={4}>
                            <Button className={styles.colcol} style={activeFilter[2]} type="button" value="undone" onClick={currentFilter}>Undone</Button>
                        </Col>
                        <Col span={5}>
                            <div className={styles.colcol}></div>
                        </Col>
                        <Col span={1}>
                            <div className={styles.colcol}>Sort</div>
                        </Col>
                        <Col span={3}>
                            <Button  className={styles.colcol} style={activeSort[0]} type="button" value="desc" onClick={sort}>Desc</Button>
                        </Col>
                        <Col span={3}>
                            <Button  className={styles.colcol} style={activeSort[1]} type="button" value="asc" onClick={sort}>Asc</Button>
                        </Col>
                    </Row>
                </div>
            </div>
    )
}

export default Head