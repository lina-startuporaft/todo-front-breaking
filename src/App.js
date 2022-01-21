import React, {useEffect, useState} from 'react'
import Head from './components/Head.js'
import DoList from './DoList.js'
import styles from './style/App.module.css'
import Paging from './components/Paging.js'
import { getByRole } from '@testing-library/react'


function App() {
  
  let [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [orderBy, setOrderBy] = useState('new');
  const [filterBy, setFilterBy] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    let newArr = [];
    switch (orderBy) {
      case ("new"):
        setTasks(sortNew(tasks));
        break;
      case ("old"):
        setFilteredTasks(sortOld(tasks));
        break;
    }
  }, [tasks, orderBy]);

  const addDo = ({count, id}) => {
    tasks = ([...tasks, {title: count, id: id, checked: false, date: '22/22/22'}]);
  }

  const delDo = (e) => {
    // setTasks(map.tasks((task) => task))
  }

  const sort = (e) => {
    setOrderBy(e.currentTarget.value);
  }

  const sortNew = (arr) => {
    return arr.sort((a, b) => {return a.id - b.id});
  }

  const sortOld = (arr) => {
    return arr.sort((a, b) => {return b.id - a.id});
  }


  return (
          <div className={styles.mybody}>
            <Head 
              addDo={addDo}
              sort={sort}
              />
            <div className={styles.content}>
              <DoList 
                tasks={filteredTasks.reverse()}
                delDo={delDo}
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