import React, {useState} from 'react';
import ReactDom from 'react-dom';
import Head from './components/Head.js'
import DoList from './DoList.js';
import './style/App.css'

function App() {
  
  const [tasks, setTasks] = useState([]);

  function addDo({count, id}){
     setTasks([{title: count, id: id}].concat(tasks));
  }

  function delDo(e) {
    let taskNew = tasks.filter((item) => item.id != e.currentTarget.id);
    setTasks(taskNew);
  }


  return (
          <div>
            <Head addDo={addDo}/>
            <div className='content'>
              <DoList tasks={tasks} delDo={delDo}/>
            </div>
          </div>
          )
}

export default App;
