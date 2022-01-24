import React, {useEffect, useState} from 'react'
import Head from './components/Head.js'
import DoList from './DoList.js'
import styles from './style/App.module.css'
import Paging from './components/Paging.js'
const axios = require('axios');


function App() {
  
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [numberTasks, setNumberTasks] = useState();
  const [orderBy, setOrderBy] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(async () => {
    upgradeTasks();
  }, [orderBy, filterBy, page]);
  
  const upgradeTasks = async () => {
    let reqFilter = (filterBy === 'all') ? '' : ('filterBy=' + filterBy + '&');
    const resultReq  = await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2?' + reqFilter + 'order=' + orderBy + '&pp=5&page=' + page);
    let newArr = resultReq.data.tasks.map((task) => {
      return {title: task.name, id: task.uuid , checked: task.done, date: task.createdAt}
    });
    setNumberTasks(resultReq.data.count);
    setTasks(newArr);
  }

  const addDo = async ({count, id}) => {
    try {
      const resultReq = await axios.post('https://todo-api-learning.herokuapp.com/v1/task/2', {
        "name": count,
        "done": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
      });
      console.log(resultReq.data);
      upgradeTasks();
    } catch (err) {
      alert(err);
    }
  }

  const delDo = async (e) => {
    try {
      const resultReq = await axios.delete('https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id);
      console.log(resultReq.data);
      upgradeTasks();
    } catch(err) {
      alert(err);
    }
  }

  const checkboxChange = async (e) => {
    // const resultReq = await axios.patch('https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id, {
    //   "done": e.currentTarget.checked,
    //   "updatedAt": new Date(),
    // });
    // console.log(resultReq.data);
    // upgradeTasks();
    axios({
      method: 'patch',
      url: 'https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id,
      data: {
        "done": e.currentTarget.checked,
        "updatedAt": new Date()
      }
    })
    .then((res) => {
      upgradeTasks();
      console.log(res);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const editTask = (e) => {
    axios({
      method: 'patch',
      url: 'https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id,
      data: {
        "name": e.currentTarget.value,
        "updatedAt": new Date()
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err)
    })
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
                checkboxChange={checkboxChange}
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