import { useState, useEffect } from "react";
import Post from "../comp/Post";
import styles from "../styles/post.module.css"

function PostsView(){
    const [posts, setPosts] = useState([])

    //get all posts
    const pullPosts = async () => {
        try {
            const response = await fetch("http://localhost:4000/getPosts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });
      
            const data = await response.json();
            if (response.status === 201) { 
                setPosts(data.posts.map(post => {                    
                    return {
                        title: post.title,
                        text: post.content,
                        userId: post.user_id,
                        postId: post.post_id    
                    };
                }
                ))
            } 
            else {
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    //check if user is logged in 
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

    const [makingNewPost, setMakingNewPost] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [newPostContent, setNewPostContent] = useState({title: "", content: ""});
    
    //execute these functions on first load
    useEffect(()=>{
        checkCookie();
        pullPosts();
    }, []) 
    

    const makeNewPost = () => {
        setMakingNewPost(true);
    }

    //stops making new post
    const cancelPost = () => {
        setMakingNewPost(false);
        setNewPostContent({title: "", content: ""});
    }

    const handlePostChange = (e) => {
        setNewPostContent({ ...newPostContent, [e.target.name]: e.target.value });
    };

    //creates new post
    const handlePost = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:4000/createPost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user.id,
                title: newPostContent.title,
                content: newPostContent.content
            })
          });
    
          const data = await response.json();
          if (response.status === 201) {    
            pullPosts();
            setNewPostContent({title: "", content: ""});
            setMakingNewPost(false);
          }
        } catch (error) {
          console.error("Error:", error);
        }
        
      };
    

    return (
        <>
        <h1>Posts</h1>
        <div>{loggedIn ? (
                    <div>
                        {makingNewPost ? (
                            <div className={styles.newPostContainer}>
                                <div className={styles.postSection}>
                                    <h2>Title:</h2>
                                    <input 
                                        value={newPostContent.title} 
                                        className={styles.titleInput} 
                                        onChange={handlePostChange} 
                                        type="text" name="title" placeholder="Add Title"/>
                                </div>
                                <div className={styles.postSection}>
                                    <div>Content:</div>
                                    <textarea 
                                        value={newPostContent.content} 
                                        onChange={handlePostChange}
                                        name="content"
                                        className={styles.contentInput} 
                                        placeholder="Add Content"/>
                                </div>
                                <div className={styles.postButtons}>
                                    <div className={styles.cancelButton} onClick={cancelPost}>Cancel</div>
                                    <div className={styles.postButton} onClick={handlePost}>Post</div>
                                </div>
                                
                            </div>
                        ) : (
                            <div className={styles.newPostButton} onClick={makeNewPost}>Make new Post</div>
                        )}
                    </div>
                    
                    
                ) : (
                    <div className={styles.newPostContainer} >Log in to add Post</div> 
                )
                }
            </div>
        <div>
            {posts.map(post => (
            <Post
                title={post.title}
                text={post.text} 
                userId={post.userId}
                postId={post.postId}
            />
            ))}

        </div>

        </>
    );
}

export default PostsView