import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import "../style/App.css";

function Do({task, delDo, checkStateChekbox}) {

    function createDate() {
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = dateNow.getMonth() + 1;
    const day = dateNow.getDate();
    return (day + '/' + month + '/' + year);
    }

    return(
        <div className="do">
            <input type="checkbox" className="coldo col1" onChange={checkStateChekbox} checked={task.checked} id={task.id}/>
            <input className="coldo col2" value={task.title}></input>
            <p className="coldo col3">{createDate()}</p>
            <input className="coldo col4" type="button" value='del' onClick={delDo} id={task.id}/>
        </div>
    )
}

export default Do