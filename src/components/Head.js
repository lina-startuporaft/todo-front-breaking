import React, {useState} from "react";
import '../style/App.css'
import ToDo from '../image/to-do.jpg'
import Sort from '../image/sort.jpg'

function Head({addDo}) {
    const [count, setCount] = useState('');
    const [id, setId] = useState(1);

    function editChange(e) {
        setCount(e.currentTarget.value);
    }

    function chekEnter(e) {
        if (e.key == 'Enter') {
            addDo({count, id});
            e.currentTarget.value = '';
            setCount('');
            setId(id + 1);
        }
    }

    return(
            <div className="head-container">
                <div className="head">
                    <div className="row">
                        <div className="col span3"></div>
                        <img src={ToDo} alt="To Do" className="col span4"/>
                        <div className="col span3"></div>
                    </div>
                    <div className="row">
                        <input className="col span1" type="text" onChange={editChange} onKeyUp={chekEnter}/>
                    </div>
                    <div className="row">
                        <input  className="col" type="button" value="All"/>
                        <input  className="col" type="button" value="Done"/>
                        <input className="col" type="button" value="Undone"/>
                        <div className="col"></div>
                        <img src={Sort} alt="Sort" className="col span2"/>
                        <input className="col span5" type="button" value="new"/>
                        <input className="col span5" type="button" value="old"/>
                    </div>
                </div>
            </div>
    )
}

export default Head 