import { useState, useEffect } from "react";
import styles from "../styles/post.module.css"

function Comment({text, userId, commentId}){
    const [creator, setCreator] = useState("");
    //comments display the name of the commentor and the text of the comment

    useEffect(()=>{
        //gets name of creator of comment
        const getCreator =  async() =>{
            try {
              const response = await fetch("http://localhost:4000/getNameById", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({id : userId})
              });
        
              const data = await response.json();
              if (response.status === 201) {
                setCreator(data.name);
              } 
              else {
              }
            } catch (error) {
              console.error("Error:", error);
            }
          };
  
          getCreator();
    })

    return(
        <div className={styles.newCommentContainer}>
            <div className={styles.creator}>{creator} : </div>
            <div className={styles.comment}>{text}</div>
        </div>
    )

}

export default Comment;