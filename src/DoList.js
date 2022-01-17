import { useState } from 'react/cjs/react.development'
import Do from './components/Do.js'

function DoList({tasks, delDo}) {
           return (
        <div>
            {tasks.map((task) => <Do task={task} delDo={delDo}/>)}
        </div>
    )
}

export default DoList