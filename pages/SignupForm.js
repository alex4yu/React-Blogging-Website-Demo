import React, { useState } from "react";
import styles from "../styles/signup.module.css"

function SignupForm() {
  const [formData, setFormData] = useState({name: "", email: "", password: "", retypePassword: ""});
  const [message, setMessage] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.status === 201) {     
        setSignedUp(true);
      } else {
        setMessage(<div>{data.error}</div>);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(<div>An error occurred. Please try again later.</div>);
    }
  };

  return (
    <div>
      {!signedUp ? (
        <div className={styles.container}>
        <h2>Signup Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input className={styles.inputs} type="text" id="name" name="name" 
              value={formData.name} onChange={handleChange} required placeholder="Name"/>
          </div>
          <div>
            <input className={styles.inputs} type="email" id="email" name="email" 
              value={formData.email} onChange={handleChange} required placeholder="Email"/>
          </div>
          <div>
            <input className={styles.inputs} type="password" id="password" name="password" 
              value={formData.password} onChange={handleChange} required placeholder="Password"/>
          </div>
          <div>
            <input className={styles.inputs} type="password" id="retypePassword" name="retypePassword" 
            value={formData.retypePassword} onChange={handleChange} required placeholder="Retype Password"/>
          </div>
          <button className={styles.submitButton} type="submit">Signup</button>
        </form>
        <div>{message && <div id="message">{message}</div>}</div>
        </div>
      ) : (
      <div>
        <h2>Welcome {formData.name}!</h2>
        <p>You have successfully signed up.</p>
      </div>
      
    )}
    </div>   
  );
}

export default SignupForm;
