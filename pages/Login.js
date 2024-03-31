import React, { use, useState } from "react";
import styles from "../styles/signup.module.css"

function Login() {
  const [formData, setFormData] = useState({email: "", password: ""});
  const [updateData, setUpdateData] = useState({name: "", email: "", password: "", retypePassword: ""});
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  const handleChangeLogin = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeUpdate = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

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
        setMessage(<div className="error"></div>);
        setUser(data.user);
        setLoggedIn(true);
        setFormData({email: "", password: "",});
      } 
      else {
        setMessage(<div className="error">{data.message}</div>);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(<div className="error">An error occurred. Please try again later.</div>);
    }
  };
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
        setUser(data.user);
        setLoggedIn(true);
        setMessage(<div className="error">Update successful</div>);
      } else {
        setMessage(<div className="error">{data.error}</div>);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(<div className="error">An error occurred. Please try again later.</div>);
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
                  value={formData.name} onChange={handleChangeUpdate} placeholder="New Name"/>
              </div>
              <div>
                <input className={styles.inputs} type="email" id="email" name="email" 
                  value={formData.email} onChange={handleChangeUpdate} placeholder="New Email"/>
              </div>
              <div>
                <input className={styles.inputs} type="password" id="password" name="password" 
                  value={formData.password} onChange={handleChangeUpdate} placeholder="New Password"/>
              </div>
              <div>
                <input className={styles.inputs} type="password" id="retypePassword" name="retypePassword" 
                  value={formData.retypePassword} onChange={handleChangeUpdate} placeholder="Retype Password"/>
              </div>
              <button className={styles.submitButton} type="submit">Update</button>
            </form>
            <div>{message && <div id="message">{message}</div>}</div>
            </div>
          </div>
      )}
    </div>
  );
}

export default Login;