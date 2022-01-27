import Do from './components/Do.js'

function DoList({tasks, delDo, editTaskGlobal}) {
    return (
        <div>
                {tasks.map((task) => {
                    return (
                    <Do
                        task={task} 
                        delDo={delDo}
                        editTaskGlobal={editTaskGlobal}
                        key={task.id}/>
                    )
                })}
        </div>
    )
}

export default DoList