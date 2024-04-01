import { useState } from "react";
import TodoItem from "../comp/TodoItem";

function TodoList(){
    //due to intial tasks, next task id starts at 3
    const[nextid, setNextid] = useState(3)
    //intial tasks
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

    // Add task with title taskText
    function addTask(taskText){
        var task = {id: nextid, text: taskText, completed: false};
        setNextid(nextid + 1);
        setTasks([...tasks, task]);
        setText('');
    }
    
    //Removes task from todo list
    function removeTask(id){
        setTasks(tasks.filter(task => task.id !== id));
    }

    // Toggles completion of task
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