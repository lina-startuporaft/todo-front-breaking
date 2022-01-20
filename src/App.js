import React, {useEffect, useState} from 'react'
import Head from './components/Head.js'
import DoList from './DoList.js'
import styles from './style/App.module.css'
import Paging from './components/Paging.js'
import { getByRole } from '@testing-library/react'


function App() {
  
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [orderBy, setOrderBy] = useState('new');
  const [filterBy, setFilterBy] = useState('all');
  const [page, setPage] = useState(0);

  useEffect(() => {
    switch (orderBy) {
      case 'old':
        setTasks(sortDown(tasks));
        break;
      case 'new':
        setTasks(sortUp(tasks));
        break;
    }
  }, [tasks, orderBy]);

  // //Create date
  // function createDate() {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   return day + '/' + month + '/' + year;
  // }

  //Del and add
  function addDo({count, id}){
    setTasks([{title: count, id: id, checked: false, date: '14/22/22'}].concat(tasks.reverse()));
  }

  function delDo(e) {
    setTasks(tasks.filter((item) => item.id != e.currentTarget.id).reverse());
  //Del last task on last page
    // if ((selectPage > ((tasks.length - 5) / 5)) && ((tasks.length - 1) % 5 == 0) && (selectPage != 1)) {
    //   setSelectPage(selectPage - 1);
    // }
  }
  
  //sort
  function sortUp(arrForSort) {
    return arrForSort.sort((a, b) => {
      return a.id - b.id;
    })
  }

  function sortDown(arrForSort) {
    return arrForSort.sort((b, a) => {
      return a.id - b.id;
    })
  } 

  function sort(e) {
    setOrderBy(e.currentTarget.value);
  }
  

  //check Checkbox
  function chekboxChange(e) {
    setTasks(tasks.map((task) => {
      if (task.checked === e.currentTarget.id) {
        return task.checked = e.currentTarget.checked
      }
    }))
  }



  // function checkStateChekbox(e) {
    // const i = tasks.findIndex((item) => {return +item.id == +e.currentTarget.id});
    // const newTask = tasks;
    // newTask[i].checked = !newTask[i].checked;

  //   setTasks(tasks.map(task => {if (task.id === e.currentTarget.id) {task.checked = !task.checked}}));
  // }

  //All, done and undone
  // function filtering(e) {
  //   setFilterBy(e.currentTarget.value);
  // }

  // const [see, setSee] = useState('All');

  // function seeDone() {
  //   setSee('Done');
  //   setSelectPage(1);
  //   switch (see) {
  //     case 'All':
  //       const thisTask = tasks.filter(item => item.checked === true);
  //       setTasks(thisTask);
  //       const anotherTask = tasks.filter(item => item.checked === false);
  //       setSecondTasks(anotherTask);
  //       break;
  //     case 'Undone':
  //       const thisTaskDone = secondTasks;
  //       const anotherTaskDone = tasks;
  //       setTasks(thisTaskDone);
  //       setSecondTasks(anotherTaskDone);
  //       break;
  // }};

  // function seeUndone() {
  //   setSelectPage(1);
  //   setSee('Undone');
  //   switch (see) {
  //     case 'All':
  //       const thisTask = tasks.filter(item => item.checked == false);
  //       setTasks(thisTask);
  //       const anotherTask = tasks.filter(item => item.checked == true);
  //       setSecondTasks(anotherTask);
  //       break;
  //     case 'Done':
  //       const thisTaskUndone = secondTasks;
  //       const anotherTaskUndone = tasks;
  //       setTasks(thisTaskUndone);
  //       setSecondTasks(anotherTaskUndone);
  //       break;
  // }}

  // function seeAll() {
  //   setSelectPage(1);
  //   setSee('All');
  //   switch (see) {
  //     case 'Done':
  //       setTasks(tasks.concat(secondTasks));
  //       break;
  //     case 'Undone':
  //       setTasks(tasks.concat(secondTasks));
  //       break;}
  // }

  // const colorActiveDefoult = [
  //   {backgroundColor: 'white'},
  //   {backgroundColor: 'white'},
  //   {backgroundColor: 'white'},
  // ];

  // const [activeSee, setActiveSee] = useState(colorActiveDefoult);

  // useEffect(() => {
  //   if (see == 'All') {
  //     if (activeSortForAll) {
  //       setTasks(sortDown(tasks));
  //     } else {
  //       setTasks(sortDown(tasks));
  //     }
  //     let newActive = colorActiveDefoult;
  //     newActive.splice(0, 1, {backgroundColor: 'rgb(64, 199, 82)'}); 
  //     setActiveSee(newActive);
  //   } else if (see == 'Done') {
  //     let newActive = colorActiveDefoult;
  //     newActive.splice(1, 1, {backgroundColor: 'rgb(64, 199, 82)'}); 
  //     setActiveSee(newActive);
  //   } else {
  //     let newActive = colorActiveDefoult;
  //     newActive.splice(2, 1, {backgroundColor: 'rgb(64, 199, 82)'}); 
  //     setActiveSee(newActive);
  //   }
  // }, [see]);

  //Paging

  // const [selectPage, setSelectPage] = useState(1);

  // function checkPage(e) {
  //   if (e.currentTarget.value == "<") {
  //     setSelectPage(1);
  //   } else if (e.currentTarget.value == ">") { 
  //     setSelectPage(Math.ceil(tasks.length / 5))
  //   } else {
  //     setSelectPage(e.currentTarget.value);
  //   }
  // }

  return (
          <div className={styles.mybody}>
            <Head 
              addDo={addDo} 
              sort={sort}
              // filtering={filtering}
              />
            <div className={styles.content}>
              <DoList 
                tasks={tasks}
                delDo={delDo} 
                chekboxChange={chekboxChange}
                // selectPage={selectPage}
                />
                {/* {(tasks.length > 5)?
                  <Paging 
                    tasks={tasks} 
                    checkPage={checkPage}
                    selectPage={selectPage}/>
                  : null} */}
            </div>
          </div>
        )
}

export default App;