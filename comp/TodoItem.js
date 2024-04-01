import React from "react";
import styles from "../styles/todo.module.css";

function TodoItem({task, removeTask, changeCompletion}) {
    function handleChange(){changeCompletion(task.id);}
    //Item displays name of task, whether the task is complete, and option to delete task
    return (
        <div className = {styles.item}>
        <p className = {styles.text}>{task.text}</p>   
        <div className = {styles.complete}>
            <input 
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
            />
            
            <div>completed</div>
       </div>
       <div className = {styles.delete} onClick={() => removeTask(task.id)}>
        delete
        </div>
        </div>
    );
      
}
export default TodoItem;