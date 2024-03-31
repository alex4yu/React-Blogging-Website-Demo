//run $ node backend/server.js
//at project root in console to start server


const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors middleware
const PORT = 4000;
const {createUser, getUserByEmail, emailExists, updateUser, deleteUser } = require("./db");
const bcrypt = require("bcrypt"); // For password hashing
const bodyParser = require("body-parser");

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use(cors({
  origin: "http://localhost:3000" // Allow requests from this origin only
}));

// Parse JSON requests
app.use(bodyParser.json());

// Middleware function to log incoming requests
const requestLoggerMiddleware = (req, res, next) => {
  // Log request details
  console.log("Request" + 
    JSON.stringify({
      timestamp: Date.now(),
      URL: req.url,
      Method: req.method,
      Host: req.headers.host
    })
  );

  // Log response details
  
  const originalSend = res.send;
  res.send = function () {
    console.log("Result" +
      JSON.stringify({
        timestamp: Date.now(),
        Response: res.statusCode,
        Message: res.message,
        Error: res.error
      })
    );
    // Call the original send function to send the response
    originalSend.apply(res, arguments);
  };
    
  next();
};
app.use(requestLoggerMiddleware);

//API endpoint
app.get("/api/data", (req, res) => {
  // Sample JSON data
  const jsonData = {
    message: "This is a sample JSON response from API endpoint 1",
    timestamp: new Date()
  };

  // Send response
  res.json(jsonData);
});

//API endpoint
app.get("/api/data2", (req, res) => {
    // Sample JSON data
    const jsonData = {
      message: "Sample data for a second endpoint",
      timestamp: new Date()
    };
  
    // Send response
    res.json(jsonData);
});

// Signup endpoint
app.post("/signup", async (req, res) => {
  const { name, email, password, retypePassword } = req.body;

  // Validate form data
  if (!name || !email || !password || !retypePassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check password match
  if (password !== retypePassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }
  
  // Check if email already in use
  if(await emailExists(email)){
    return res.status(400).json({ error: "Email already in use, please choose a different one" });
  } 
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const result = await createUser(name, email, hashedPassword);
    if(result.success){
      //return success
      return res.status(201).json({ message: "User " + result.user.name+" created successfully"});
    }
    else{
      res.status(500).json({ error: "Internal server error" });
    }
    
    
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "An error occurred during sign up" });
  }
})

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Retrieve user given email
    const result = await getUserByEmail(email);

    // Check success of retrieval
    if (!result.success) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Extract hashed password from the database
    const hashedPassword = result.user.password;
    
    // Compare hashed password with entered password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Login successful
    return res.status(201).json({ message: "Login successful", user: result.user });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during log in" });
  }
});

// Update endpoint
app.post("/update", async (req, res) => {
  let {name, email, password, retypePassword, userName, userEmail, userPassword, userId } = req.body;
  
  // Check if any fields were left blank
  // blank fields should not be changed in the database 
  if(name === ""){
    name = userName;
  }
  if(email === ""){
    email = userEmail;
  }
  if(password === ""){
    password = userPassword;
  }
  else{
    // Check password match
    if (password !== retypePassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    //hash password
    else{
      password = await bcrypt.hash(password, 10);
    }
  }

  // Update in database
  try {
    const result = await updateUser(userId, name, email, password);
    if(result.success){
      //return success
      return res.status(201).json({ message: "Login successful", user: result.user });
    }
    else{
      res.status(500).json({ error: "result failure" });
    }
    
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during update" });
  }
});

// Delete endpoint
app.post("/delete", async (req, res) => {
  const { id, name } = req.body;
  
  try {
    // Delete user by id
    const result = await deleteUser(id);

    if(result.success){
      //return success
      return res.status(201).json({ message: "User deleted successfully", name: name});
    }
    else{
      res.status(500).json({ error: "Internal server error" });
    }

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during deletion" });
  }
});



