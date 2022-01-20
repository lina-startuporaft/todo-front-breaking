import Do from './components/Do.js'

function DoList({tasks, delDo, checkStateChekbox, selectPage}) {
           return (
        <div>
            {tasks.map((task, index) => {
                if ((index >= (selectPage * 5 - 5))&&(index <= (selectPage * 5 - 1))) {
                return (
                <Do
                    task={task} 
                    delDo={delDo} 
                    checkStateChekbox={checkStateChekbox} 
                    key={task.id}/>
                )
            }})}
        </div>
    )
}

export default DoList