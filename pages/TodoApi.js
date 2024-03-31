import { useState } from "react";
import { useEffect } from "react";
import TodoItem from "../comp/TodoItem";
function TodoList(){
    const[nextid, setNextid] = useState(3)
    const[tasks, setTasks] = useState([])
    useEffect(() => {  
        fetchData();
    }, [])   
    const fetchData = async () => {
        // $ json-server --watch backend\db.json --port 8000
        try{
            const response = await fetch("http://localhost:8000/todos")
            //fetches data stored in db.json
            const newData = await response.json()
            setTasks(newData)
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        
    };
  
    const [text, setText] = useState('');
    function addTask(taskTest){
        var task = {id: nextid, text: taskTest, completed: false};
        setNextid(nextid + 1);
        setTasks([...tasks, task]);
        setText('');
    }
    function removeTask(id){
        setTasks(tasks.filter(task => task.id !== id));
    }
    function changeCompletion(id){
        setTasks(tasks.map(task => {
            if(task.id == id){
                task.completed = !task.completed;
            }
            return task;
        }
        ))
    }

    return (
        <>
        <h1>Todo List</h1>
        <div className="todo-list">
        <input
            value={text}
            onChange={e => setText(e.target.value)} 
        />
        <button onClick={() => addTask(text)}>Add Task</button>
        {tasks.map(task => (
        <TodoItem
        key={task.id}
        task={task} 
        removeTask={removeTask}
        changeCompletion={changeCompletion}
        />
        ))}
    
        </div>

        </>
        );
       
}

export default TodoList;