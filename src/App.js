import React, {useEffect, useState} from 'react'
import Head from './components/Head.js'
import DoList from './DoList.js'
import styles from './style/App.module.css'
import { Pagination, message } from 'antd';
import 'antd/dist/antd.css'
const axios = require('axios');


function App() {
  
  const [tasks, setTasks] = useState([]);
  const [numberPage, setNumberPage] = useState();
  const [orderBy, setOrderBy] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(async () => {
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
    setNumberPage(Math.ceil(resultReq.data.count / 5));
    setTasks(newArr);
    } catch (err) {
      message.error(`${err.name}:${err.message}`);
    }
  }

  const addDo = async ({nameTask}) => {
    try {
      const resultReq = await axios.post('https://todo-api-learning.herokuapp.com/v1/task/2', {
        "name": nameTask,
        "done": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
      });
      upgradeTasks(orderBy, filterBy, page);
    } catch (err) {
      if (err.message == 'Request failed with status code 400') {
        message.error('there is already a task');
      } else {
        message.error(`${err.name}:${err.message}`);
      }
    }
  }

  const delDo = async (e) => {
    try {
      const resultReq = await axios.delete('https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id);
      upgradeTasks(orderBy, filterBy, page);
      if ((numberPage === page) && (tasks.length == 1) && (page != 1)) {
        setPage(numberPage - 1);
      }
    } catch(err) {
      message.error(`${err.name}:${err.message}`);
    }
  }

  const editTaskGlobal = async (name, id, checked) => {
      const resultReq = await axios.patch('https://todo-api-learning.herokuapp.com/v1/task/2/' + id, {
      "name": name,
      "done": checked,
      "updatedAt": new Date(),
    });
    upgradeTasks(orderBy, filterBy, page);
  }

  const sort = (e) => {
    setOrderBy(e.currentTarget.value);
  }

  const currentFilter = (e) => {
    setFilterBy(e.currentTarget.value);
    setPage(1);
  }

  const checkPage = (current) => {
        setPage(current);
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
                  editTaskGlobal={editTaskGlobal}/>
                    <Pagination 
                      defaultCurrent={1}
                      current={page}
                      total={numberPage*10}
                      onChange={checkPage}
                      showSizeChanger={false}
                      className={styles.pagingconteiner}
                      hideOnSinglePage={true}/>  
              </div>
          </div>
        )
}

export default App;