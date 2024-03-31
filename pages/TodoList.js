import { useState } from "react";
import { useEffect } from "react";
import TodoItem from "../comp/TodoItem";
function TodoList(){
    const[nextid, setNextid] = useState(3)
    const[tasks, setTasks] = useState([
        {
            id: 1,
            text: "create Todo list component",
            completed: true
        },
        {
            id: 2,
            text: "win the lottery",
            completed: false
        }
    ])

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