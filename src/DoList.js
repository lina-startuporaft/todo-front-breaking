import { useEffect } from 'react'
import Do from './components/Do.js'

function DoList({tasks, delDo, checkboxChange, editTask}) {
    return (
        <div>
            {tasks.map((task) => {
                return (
                <Do
                    task={task} 
                    delDo={delDo}
                    checkboxChange={checkboxChange}
                    editTask={editTask}
                    key={task.id}/>
                )
            })}
        </div>
    )
}

export default DoList