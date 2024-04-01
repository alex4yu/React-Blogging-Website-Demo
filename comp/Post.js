import { useState, useEffect } from "react";
import styles from "../styles/post.module.css"
import Comment from "../comp/Comment";

function Post({title, text, userId, postId}){
  // posts contain the title of the post, the content of the post, the name of the creator, 
  // and comments to the post
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [creator, setCreator] = useState("");
  const [currrnetComment, setCurrentComment] = useState("");
    

  //see if user is already logged in
  const checkCookie = async () => {
    const cookies = document.cookie.split(';');
    let cookieMap = new Map();
    for(let i = 0; i < cookies.length; i++)
    {
        let cookie = cookies[i];
        if(cookie.substring(0,1) === " ")
        {
          cookie = cookie.substring(1);
        }
        let key = cookie.substring(0, cookie.indexOf("="));
        let value = cookie.substring(cookie.indexOf("=") + 1)+"";
        cookieMap.set(key, value);    
    }
    if(cookieMap.has("userId") && cookieMap.get("userId").length != 0){
      try {
        const response = await fetch("http://localhost:4000/getById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({id : cookieMap.get("userId")})
        });
  
        const data = await response.json();
        if (response.status === 201) { 
          
          setUser(data.user);
          setLoggedIn(true);
        } 
        else {
        }
      } catch (error) {
        console.error("Error:", error);
      }
      
    }
  };

  //get the name of the creator of the post
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

  //gets all the comments of this post
  const pullComments = async () => {
    try {
        const response = await fetch("http://localhost:4000/getComments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postId : postId})
        });
  
        const data = await response.json();
        
        if (response.status === 201) { 
          setComments(data.comments.map(comment => {                    
              return ({
                  text: comment.content,
                  userId: comment.user_id
              });
          }
          ))
        } 
        
    } catch (error) {
        console.error("Error:", error);
    }
  };

  //execute these functions on first load
  useEffect(()=>{  
    getCreator();
    checkCookie();
    pullComments();
  }, []) 

const changeShowComments = () =>{
  setShowComments(!showComments);
}
const handleCommentChange = (e) =>{
  setCurrentComment(e.target.value);
}

//creates comment under the post
const handlePostComment = async (e) => {
  e.preventDefault();
      try {
          const response = await fetch("http://localhost:4000/createComment", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  userId: user.id,
                  postId: postId,
                  content: currrnetComment
              })
          });
          if (response.status === 201) { 
              pullComments();
              setCurrentComment("");
          } 
          else {
          }
      } catch (error) {
          console.error("Error:", error);
      }
  }   
    
    return(
        <div className={styles.postContainer}>
            <div className={styles.title}>{title}</div>
            <div className={styles.creator}>{creator}</div>
            <div className={styles.text}>{text}</div>
            <div>{loggedIn ? 
                (
                    <div className={styles.newCommentContainer}>
                        <div>{user.name} : </div>
                        <input value = {currrnetComment} className={styles.inputs} onChange={handleCommentChange} type="text" id="comment" name="comment" placeholder="Add comment..."/>
                        <div className={styles.submitComment} onClick={handlePostComment}>Post comment</div>
                    </div>
                    
                ) : (
                    <div className={styles.newCommentContainer}>Log in to add comments</div> 
                )
                }
            </div>
            <div>{showComments ?
              (
                <div>
                  {comments.map(comment => (
                  <Comment
                    text={comment.text} 
                    userId={comment.userId}
                    commentId={comment.commentId}
                  />
                  ))}
                  <div className={styles.showComments} onClick={changeShowComments}>Hide commments</div>
                </div>
              ) : (
                <div className={styles.showComments} onClick={changeShowComments}>Show {comments.length} commments</div>
                
              )}
              
            </div>
            
        </div>
    )
}
export default Post;