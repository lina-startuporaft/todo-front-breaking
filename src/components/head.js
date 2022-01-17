import React, {useState} from 'react';
import '..//App.css'
import todo from '..//image/todo.jpg';
import sort from '..//image/sort.jpg';
import App from '../App.js'


function Welcome(){
    const [count, setCount] = useState('');
    let i =1;

    function userChange(e) {
      setCount(e.currentTarget.value);
    }

    function chekEnter(e) {
        if (e.key == 'Enter') {
            App(i);
            e.currentTarget.value = '';
            setCount();
        }
    }

    return(
            <div className='root'>
                <div className="head-container">
                    <div className="head">
                        <div className="row">
                            <div className="col span3"></div>
                            <img src={todo} alt="To Do" className="col span4"/>
                            <div className="col span3"></div>
                        </div>
                        <div className="row">
                            <input className="col span1" type="text" value={count} onChange={userChange} onKeyDown={chekEnter}/>
                        </div>
                        <div className="row">
                                <input  className="col" type="button" value="All"/>
                                <input  className="col" type="button" value="Done"/>
                                <input className="col" type="button" value="Undone"/>
                                <div className="col"></div>
                                <img src={sort} alt="Sort" className="col span2"/>
                                <input className="col span5" type="button" value="new"/>
                                <input className="col span5" type="button" value="old"/>
                        </div>
                    </div>
                </div>
                <div id="content" className="content">
                </div>
            </div>
        )
}

export default Welcome;