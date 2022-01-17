import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import Head from './components/Head.js'
import DoList from './DoList.js';
import './style/App.css'

function App() {
  
  const [tasks, setTasks] = useState([]);

  const [sort, setSort] = useState('none');

  function addDo({count, id}){
     setTasks([{title: count, id: id}].concat(tasks));
  }

  function delDo(e) {
    let taskNew = tasks.filter((item) => item.id != e.currentTarget.id);
    setTasks(taskNew);
  }
  
  function sortDoUp() {
    setTasks(tasks.sort((a, b) => {
      return a.id - b.id;
    }));
    console.log(tasks);
    setSort('Up');
  }

  function sortDoDown() {
    setTasks(tasks.sort((a, b) => {
      return b.id - a.id
    }));
    console.log(tasks);
    setSort('Down');
  }
  

  return (
          <div>
            <Head addDo={addDo} sortDoUp={sortDoUp} sortDoDown={sortDoDown}/>
            <div className='content'>
              <DoList tasks={tasks} delDo={delDo}/>
            </div>
          </div>
          )
}

export default App;
