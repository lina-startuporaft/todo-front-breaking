import React, {useEffect, useState} from 'react'
import Head from './components/Head.js'
import DoList from './DoList.js'
import styles from './style/App.module.css'
import Paging from './components/Paging.js'
import { getByRole } from '@testing-library/react'
const axios = require('axios');


function App() {
  
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [filterBy, setFilterBy] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    let reqFilter = (filterBy === 'all') ? null : ('filterBy=' + filterBy + '&');
    axios({
      method: 'get',
      url: 'https://todo-api-learning.herokuapp.com/v1/tasks/2?' +reqFilter+ 'order=' + orderBy + '&pp=5&page=' + page,
      responseType: 'stream'
    })
    .then((res) => {
        let newTasks = res.data;
        let newArr = newTasks.map((task) => {return {title: task.name, id: task.uuid , checked: task.done, date: task.createdAt}});
        console.log(newArr);
        setTasks(newArr);
    })
    .catch((err) => {
        console.log('err');
    });
  }, [orderBy, filterBy, page]);

  const addDo = ({count, id}) => {
  }

  const delDo = () => {

  }

  const sort = (e) => {
    setOrderBy(e.currentTarget.value);
  }

     
  const currentFilter = (e) => {
    setFilterBy(e.currentTarget.value)
  }

  const checkPage = (e) => {
    setPage(e.currentTarget.value);
  }



  return (
          <div className={styles.mybody}>
            <Head 
              addDo={addDo}
              sort={sort}
              currentFilter={currentFilter}
              />
            <div className={styles.content}>
              <DoList 
                tasks={tasks}
                delDo={delDo}
                />
                  <Paging 
                    checkPage={checkPage}/>
            </div>
          </div>
        )
}

export default App;