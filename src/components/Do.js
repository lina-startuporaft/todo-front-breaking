import React, {useState} from 'react';
import '..//App.css'

let i = 0;
function Do() {
    i = i + 1;
    return(
        <div className="do" id={i}>
                    <input type="checkbox" className="coldo col1"/>
                    <p className="coldo col2">Do something</p>
                    <p className="coldo col3">12/01/2022</p>
                    <input className="coldo col4" type="button" value='del'/>
                </div>
    )
}

export default Do