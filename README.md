Hello, this is my submission of the techinal assessment. 
I was able to complete tasks 1 - 8. 
1. Todo list
    The todo list is created by combining the page TodoList and the component TodoItem found in comp/TodoItem.js
    The TodoList page keeps track of all the tasks and updates the list of tasks if any should be added or removed.
    The TodoList then renders the page by taking the tasks and creating a TodoItem component out of it which will 
    display individual tasks. 

2. Next.js Routing
    I added a layout which would be applied to every page by utilizing pageprops within my _app.js
    The layout would include a header that utilized the next.js Link component to navigate between pages. 

3. API integration
    The TodoApi page utilizes a mock api endpoint that returns a JSON containing the information for 5
    new todo tasks. The JSON it represents can be found at backend/db.json
    The mock api can be started with $ json-server --watch backend\db.json --port 8000

4. Node.js Server
    The Server Demo page can display data from api endpoints of the node.js server I created. 
    The server code is in backend/server.js.
    Server Demo can display data from 2 different api endpoints. 

5. Middleware
    I implemented a middleware function that logs information about incoming requests and their results in the console.

6. Database interaction
    I created a users table in a postgre database that includes: name, email, password of user accounts.
    The sql command I used can be found in backend/users.txt 
    Users can sign up with the sign up page, although a successful sign up will not "log them in"
    To log in, users must enter the email and password they signed up with in the log in page.
    Upon successful login, the user can then update any of their user information. 
    They can also log out or delete their account from the database.

    I ran into some challenges with the order of executions of some functions that arised from not awaiting fetches

7. Database Schema
    I created a posts table and a comments table that stores user posts and comments. The sql commands I executed to create these tables
    can be found in the backend/posts.txt and backend/comments.txt files. 
    It was important that rows in the posts table were related to a certain user, and that comments were related to both a user and a post.
    So that comments can be displayed under the correct post.

8. SQL Queries
    The posts page displays many sql queries that retrieve posts from users and comments associated with those posts. 
    Although I don't have a feature that directly retrieves posts from a specific user, it would be pretty easy to add on
    by adding another api endpoint in the server and adjusting function calls the sql queries to target a specific user.
    When I pulled comments from the database it was critical that I made sure they were added to the correct post rather than being
    added to a post that it was not originally commented under. 
    Only logged in users can create new posts and comment on other posts. 

    I ran into some challenges regarding how to match the comments to the posts as well as some issues again with the code execution order
    because of asychronous nature of fetching data. 

I have also added the table data which can be found in table_exports


