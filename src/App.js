import React, {useEffect, useState} from 'react';
import Head from './components/Head.js'
import DoList from './DoList.js';
import './style/App.css'

function App() {
  
  const [tasks, setTasks] = useState([]);

  const [secondTasks, setSecondTasks] = useState(0);

  //by re-render
  const [state, setState] = useState(false);

  function addDo({count, id}){
     setTasks([{title: count, id: id, checked: false}].concat(tasks));
  }

  function delDo(e) {
    let taskNew = tasks.filter((item) => item.id != e.currentTarget.id);
    setTasks(taskNew);
  }
  
  function sortDoUp() {
    setTasks(tasks.sort((a, b) => {
      return a.id - b.id;
    }));
    setState(!state);
  }

  function sortDoDown() {
    setTasks(tasks.sort((a, b) => {
      return b.id - a.id
    }));
    setState(!state);
  }

  function checkStateChekbox(e) {
    const i = tasks.findIndex((item) => {return +item.id == +e.currentTarget.id});
    const newTask = tasks;
    newTask[i].checked = !newTask[i].checked;
    setTasks(newTask);
    setState(!state);
  }

  const [see, setSee] = useState('All');

  function seeDone() {
  switch (see) {
    case 'All':
      setSee('Done');
      const thisTask = tasks.filter(item => item.checked == true);
      setTasks(thisTask);
      const anotherTask = tasks.filter(item => item.checked == false);
      setSecondTasks(anotherTask);
      break;
    case 'Undone':
      setSee('Done');
      const thisTaskDone = secondTasks;
      const anotherTaskDone = tasks;
      setTasks(thisTaskDone);
      setSecondTasks(anotherTaskDone);
      break;
    case 'Done':
      const newDone = tasks.filter(item => item.checked == false);
      console.log(newDone);
      break;
  }};

  function seeUndone() {
    switch (see) {
      case 'All':
        setSee('Undone');
        const thisTask = tasks.filter(item => item.checked == false);
        setTasks(thisTask);
        const anotherTask = tasks.filter(item => item.checked == true);
        setSecondTasks(anotherTask);
        break;
      case 'Done':
        setSee('Undone');
        const thisTaskUndone = secondTasks;
        const anotherTaskUndone = tasks;
        setTasks(thisTaskUndone);
        setSecondTasks(anotherTaskUndone);
        break;
  }}

  function seeAll() {
    switch (see) {
      case 'Done':
        setSee('All');
        setTasks(tasks.concat(secondTasks));
        break;
      case 'Undone':
        setSee('All');
        setTasks(tasks.concat(secondTasks));
        break;}
  }

  useEffect(() => {
    if (see == 'All') {sortDoDown()};
  }, [see]);

  return (
          <div className='back'>
            <Head addDo={addDo} sortDoUp={sortDoUp} sortDoDown={sortDoDown} seeDone={seeDone} seeUndone={seeUndone} seeAll={seeAll}/>
            <div className='content'>
              <DoList tasks={tasks} delDo={delDo} checkStateChekbox={checkStateChekbox}/>
            </div>
          </div>
          )
}

export default App;
