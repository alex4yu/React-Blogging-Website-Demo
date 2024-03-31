const { Pool } = require("pg");

//db information
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "BizincUsers",
  password: "youlexa",
  port: 5432,
});


//SQL used to create users table
//CREATE TABLE users ( id SERIAL PRIMARY KEY,name VARCHAR(50) NOT NULL,email VARCHAR(100) UNIQUE NOT NULL,password VARCHAR(100) NOT NULL);

// Create a new user
async function createUser(name, email, password) {
    const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, password];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
        // User created successfully, return the user object
        return {
          success: true,
          message: "User created successfully",
          user: result.rows[0]
        };
    } 
    else {
        // Query did not return a user record, handle the error
        return {
          success: false,
          message: "Failed to create user"
        };
    }
    
}
  
// Get a user by email
// Used for log in
async function getUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
        // User retrieved successfully, return the user object
        return {
          success: true,
          message: "User retrieved successfully",
          user: result.rows[0]
        };
    } 
    else {
        // Query did not return a user record, handle the error
        return {
          success: false,
          message: "Failed to retrieve user"
        };
    }
}

// Returns true if email exists
// Used in sign up, user must choose different email
async function emailExists(email) {
    const query = 'SELECT COUNT(*) FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);

    // Extract the count from the query result
    const count = parseInt(result.rows[0].count);

    // If count is greater than 0, email is in use
    return count > 0;
}
  
// Update a user by ID
async function updateUser(id, name, email, password) {
    const query = "UPDATE users SET name = $2, email = $3, password = $4 WHERE id = $1 RETURNING *";
    const values = [id, name, email, password];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
        // User updated successfully, return the success and user object
        return {
          success: true,
          message: "User updated successfully",
          user: result.rows[0]
        };
    } 
    else {
        // Information did not update properly
        return {
          success: false,
          message: "Failed to update user"
        };
    }
}
  
// Delete a user by ID
async function deleteUser(id) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
        // User deleted successfully
        return {
          success: true,
          message: "User deleted",
        };
    } 
    else {
        // Did not delete properly
        return {
          success: false,
          message: "Failed to delete user"
        };
    }
    
}

//export functions  
module.exports = {
    pool,
    createUser,
    getUserByEmail,
    emailExists,
    updateUser,
    deleteUser
};

