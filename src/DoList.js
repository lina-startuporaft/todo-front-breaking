import { useEffect } from 'react'
import Do from './components/Do.js'

function DoList({tasks, delDo, checkboxChangeEdit, editTaskGlobal}) {
    return (
        <div>
            {tasks.map((task) => {
                return (
                <Do
                    task={task} 
                    delDo={delDo}
                    checkboxChangeEdit={checkboxChangeEdit}
                    editTaskGlobal={editTaskGlobal}
                    key={task.id}/>
                )
            })}
        </div>
    )
}

export default DoList