import React, {useEffect, useState} from 'react'
import Head from './components/Head.js'
import DoList from './DoList.js'
import styles from './style/App.module.css'
import Paging from './components/Paging.js'
const axios = require('axios');


function App() {
  
  const [tasks, setTasks] = useState([]);
  const [numberTasks, setNumberTasks] = useState();
  const [orderBy, setOrderBy] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    upgradeTasks(orderBy, filterBy, page);
  }, [orderBy, filterBy, page]);
  
  const upgradeTasks = async (orderBy, filterBy, page) => {
    try {
      const resultReq  = await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2', {
      params: {
        filterBy: (filterBy === 'all') ? null : filterBy,
        order: orderBy,
        pp: "5",
        page: page,
      }
    });
    let newArr = resultReq.data.tasks.map((task) => {
      return {title: task.name, id: task.uuid , checked: task.done, date: task.createdAt}
    });
    setNumberTasks(resultReq.data.count);
    setTasks(newArr);
    } catch (err) {
      alert(err);
    }
  }

  const addDo = async ({count}) => {
    try {
      const resultReq = await axios.post('https://todo-api-learning.herokuapp.com/v1/task/2', {
        "name": count,
        "done": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
      });
      upgradeTasks(orderBy, filterBy, page);
    } catch (err) {
      alert(err);
    }
  }

  const delDo = async (e) => {
    try {
      const resultReq = await axios.delete('https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id);
      upgradeTasks(orderBy, filterBy, page);
      if ((((numberTasks - 1) / 5) == (page - 1)) && (page != 1)) {
        setPage(page - 1);
      }
    } catch(err) {
      alert(err);
    }
  }

  const checkboxChangeEdit = async (e, name) => {
    try {
      const resultReq = await axios.patch('https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id, {
        "name": name,
        "done": e.currentTarget.checked,
      });
      upgradeTasks(orderBy, filterBy, page);
    } catch(err) {
      alert(err);
    }
  }

  const editTask = async (e) => {
    try {
      const resultReq = await axios.patch('https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id, {
      "name": e.currentTarget.value,
      "updatedAt": new Date(),
    });
    upgradeTasks(orderBy, filterBy, page);
    } catch(err) {
      alert(err);
    }
  }

  const sort = (e) => {
    setOrderBy(e.currentTarget.value);
  }

  const currentFilter = (e) => {
    setFilterBy(e.currentTarget.value);
    setPage(1);
  }

  const checkPage = (e) => {
    switch (e.currentTarget.value) {
      case ('<'):
        setPage(1);
        break;
      case ('>'):
        setPage(Math.ceil(numberTasks / 5));
        break;
      default:
        setPage(e.currentTarget.value);
    }
  }

  return (
          <div className={styles.mybody}>
            <Head 
              addDo={addDo}
              sort={sort}
              currentFilter={currentFilter}
              filterBy={filterBy}
              orderBy={orderBy}
              />
            <div className={styles.content}>
              <DoList 
                tasks={tasks}
                delDo={delDo}
                checkboxChangeEdit={checkboxChangeEdit}
                editTask={editTask}/>
                {(numberTasks > 5) ?
                  <Paging 
                  checkPage={checkPage}
                  page={page}
                  numberTasks={numberTasks}/> :
                  null
                }
                  
            </div>
          </div>
        )
}

export default App;