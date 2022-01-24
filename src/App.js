import React, {useEffect, useState} from 'react'
import Head from './components/Head.js'
import DoList from './DoList.js'
import styles from './style/App.module.css'
import Paging from './components/Paging.js'
const axios = require('axios');


function App() {
  
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(true);
  const [lengthPage, setLengthPage] = useState();
  const [orderBy, setOrderBy] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let reqFilter = (filterBy === 'all') ? '' : ('filterBy=' + filterBy + '&');
    axios({
      method: 'get',
      url: 'https://todo-api-learning.herokuapp.com/v1/tasks/2?' + reqFilter + 'order=' + orderBy + '&pp=5&page=' + page,
      responseType: 'stream'
    })
    .then((res) => {
      let newArr = res.data.tasks.map((task) => {return {title: task.name, id: task.uuid , checked: task.done, date: task.createdAt}});
      setLengthPage(res.data.count);
      setTasks(newArr);
    })
    .catch((err) => {
        console.log(err);
    });
  }, [tasks, orderBy, filterBy, page]);
  
  const addDo = ({count, id}) => {
    axios({
      method: 'post',
      url: 'https://todo-api-learning.herokuapp.com/v1/task/2',
      data: {
        "name": count,
        "done": false,
        "createdAt": new Date(),
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

  const delDo = (e) => {
    axios({
      method: 'delete',
      url: 'https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const checkboxChange = (e) => {
    axios({
      method: 'patch',
      url: 'https://todo-api-learning.herokuapp.com/v1/task/2/' + e.currentTarget.id,
      data: {
        "done": e.currentTarget.checked,
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
    setFilterBy(e.currentTarget.value)
  }

  const checkPage = (e) => {
    switch (e.currentTarget.value) {
      case ('<'):
        setPage(1);
        break;
      case ('>'):
        setPage(Math.ceil(lengthPage / 5));
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
                editTask={editTask}
                />
                  <Paging 
                    checkPage={checkPage}
                    page={page}
                    lengthPage={lengthPage}/>
            </div>
          </div>
        )
}

export default App;