import { useEffect } from 'react'
import Do from './components/Do.js'

function DoList({tasks, delDo}) {
           return (
        <div>
            {tasks.map((task) => {
                return (
                <Do
                    task={task} 
                    delDo={delDo}
                    key={task.id}/>
                )
            })}
        </div>
    )
}

export default DoList