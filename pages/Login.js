import React, { useState, useEffect } from "react";
import styles from "../styles/signup.module.css"

function Login() {
  const [formData, setFormData] = useState({email: "", password: ""});// Log in inputs
  const [updateData, setUpdateData] = useState({name: "", email: "", password: "", retypePassword: ""});// Change user info inputs
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(()=>{

    //checks if user has already logged in
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
            method: "Post",
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
            setMessage(<div>{data.message}</div>);
          }
        } catch (error) {
          console.error("Error:", error);
          setMessage(<div>An error occurred fetching with cookie</div>);
        }
        
      }
    };
    checkCookie();
  }, []) 

  //change login inputs
  const handleChangeLogin = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //change user update inputs
  const handleChangeUpdate = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.status === 201) { 
        //display success, rerender showing logged in page
        setMessage(<div></div>);
        //update stored user data
        setUser(data.user);
        setLoggedIn(true);
        //clear login inputs
        setFormData({email: "", password: "",});
        //set cookie
        document.cookie = "userId=" + data.user.id;
      } 
      else {
        setMessage(<div>{data.message}</div>);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(<div>An error occurred. Please try again later.</div>);
    }
  };

  // Change user information
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: updateData.name,
          email: updateData.email,
          password: updateData.password,
          retypePassword: updateData.retypePassword,
          userName: user.name,
          userEmail: user.email,
          userPassword: user.password,
          userId: user.id
        })
      });

      const data = await response.json();
      if (response.status === 201) {    
        //display success, rerender showing logged in page
        //update stored user data
        setUser(data.user);
        //clear inputs
        setUpdateData({name: "", email: "", password: "", retypePassword: ""});
        setLoggedIn(true);
        setMessage(<div>Update successful</div>);
      } else {
        setMessage(<div>{data.error}</div>);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(<div>An error occurred. Please try again later.</div>);
    }
    
  };

  const logout = () =>{
    //log out
    setLoggedIn(false);
    //clear user data
    setUser(null);
    //clear inputs
    setUpdateData({name: "", email: "", password: "", retypePassword: ""});
    //clear cookie
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    setMessage(<div>Logged Out</div>);
  }
  
  // Delete account
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
        if (window.confirm('Are you really, really sure? This action cannot be undone, all data will be lost!')) {
          try {
            const response = await fetch("http://localhost:4000/delete", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({id: user.id, name: user.name})
            });
            const data = await response.json();
            if (response.status === 201) { 
              //log out
              setLoggedIn(false);
              //clear user obj
              setUser(null);
              alert("Good Bye " + data.name);
            } 
            else {
              setMessage(<div>{data.message}</div>);
            }
          } catch (error) {
            console.error("Error:", error);
            setMessage(<div>An error occurred. Please try again later.</div>);
          }
        }
    }
  };
  
  return (
    <div>
      {!loggedIn ? (
        <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input className={styles.inputs} type="email" id="email" name="email" 
              value={formData.email} onChange={handleChangeLogin} required placeholder="Email"/>
          </div>
          <div>
            <input className={styles.inputs} type="password" id="password" name="password" 
              value={formData.password} onChange={handleChangeLogin} required placeholder="Password"/>
          </div>
          <button className={styles.submitButton} type="submit">Login</button>
        </form>
        <div>{message && <div id="message">{message}</div>}</div>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>You have successfully logged in.</p>
          <div className={styles.container}>
            <h2>Update user info</h2>
            <p>Lines left blank will not be changed</p>
            <p>If you do not see the placeholder text it means the line is not blank</p>
            <form onSubmit={handleUpdate}>
              <div>
                <input className={styles.inputs} type="name" id="name" name="name" 
                  value={updateData.name} onChange={handleChangeUpdate} placeholder="New Name"/>
              </div>
              <div>
                <input className={styles.inputs} type="email" id="email" name="email" 
                  value={updateData.email} onChange={handleChangeUpdate} placeholder="New Email"/>
              </div>
              <div>
                <input className={styles.inputs} type="password" id="password" name="password" 
                  value={updateData.password} onChange={handleChangeUpdate} placeholder="New Password"/>
              </div>
              <div>
                <input className={styles.inputs} type="password" id="retypePassword" name="retypePassword" 
                  value={updateData.retypePassword} onChange={handleChangeUpdate} placeholder="Retype Password"/>
              </div>
              <button className={styles.submitButton} type="submit">Update</button>
            </form>
            <div>{message && <div id="message">{message}</div>}</div>
          </div>
          <div className={styles.logout} onClick={logout}>Log Out</div>
          <div className={styles.delete} onClick={handleDelete}>Delete Account</div>
        </div>
          
      )}
    </div>
  );
}

export default Login;
