// import React , {useState, useEffect} from "react"

// function Todolist(){

//     const [todos, setTodos] = useState([]);
//     const [title , setTitle] = useState("");
//     const [description , setDescription] = useState("");


//     useEffect(()=>{
//        fetchTodos();
//     }, [])
    
//     function fetchTodos()
//     {
//         const fetchedData = fetch("http://localhost:3113/todos")
//         .then((fetchedData)=>fetchedData.json())
//         .then((data)=>{
            
//             setTodos(data);

//         })
//     }
//     function AddTodo()
//     {
//           if(!title || !description)
// {
//     alert("Please enter both the input fields correctly.")
    
// }
// const newTodo = {
//     title ,
//     description 
// };
//    fetch("http://localhost:3113/todos",{
//     method : "POST",
//     headers :{
//         "Content-Type" : "application/json",

//     },
//     body : JSON.stringify(newTodo)
//    })
//    .then((res) => res.json())
//    .then((data)=>{
//     setTodos([...todos, data.todo]);
//     setTitle('');
//     setDescription("");
//    })
//     }
    
//     return (
//         <div>
//         <h2> Welcome to the Todo React App</h2>
//         <div>
//             <input type="text" placeholder="Enter the title here..." />
//             <br />
//             <br />
//             <input type="text" placeholder="Enter the description..." />
//             <br />
//             <br />
//             <button style={
//                 {
//                     backgroundColor : "black",
//                     color : "white",
//                     width : 75,
//                     height : 75
//                 }
//             } onClick = {AddTodo}>Add Todo</button>
//         </div>
//         </div>
//     )
// }




// export default Todolist;
import React, { useState, useEffect } from "react";

function Todolist() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Fetch todos when component mounts
    useEffect(() => {
        fetchTodos();
    }, []);

    // Fetch todos from the backend
    function fetchTodos() {
        fetch("http://localhost:3113/todos")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Use response.json() correctly
            })
            .then((data) => {
                setTodos(data); // Assuming your API returns an array of todos
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
            });
    }

    // Function to add a new todo
    function AddTodo() {
        if (!title || !description) {
            alert("Please enter both the input fields correctly.");
            return; // Exit the function early if fields are empty
        }

        const newTodo = {
            title,
            description
        };

        // Make a POST request to add a new todo
        fetch("http://localhost:3113/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify(newTodo) // Convert newTodo object to JSON
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json(); // Parse the response as JSON
            })
            .then((data) => {
                setTodos([...todos, data.todo]); // Update the todos state
                setTitle(''); // Clear the title input
                setDescription(''); // Clear the description input
            })
            .catch((error) => {
                console.error("Error adding todo:", error);
            });
    }

    return (
        <div>
            <h2>Welcome to the Todo React App</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter the title here..."
                    value={title} // Set the value to state
                    onChange={(e) => setTitle(e.target.value)} // Update state on change
                />
                <br />
                <br />
                <input
                    type="text"
                    placeholder="Enter the description..."
                    value={description} // Set the value to state
                    onChange={(e) => setDescription(e.target.value)} // Update state on change
                />
                <br />
                <br />
                <button
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        width: 75,
                        height: 75,
                    }}
                    onClick={AddTodo}
                >
                    Add Todo
                </button>
            </div>
            {/* Optionally render the list of todos */}
            <div>
                <h3>Todo List:</h3>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo._id}>
                            <strong>{todo.title}</strong>: {todo.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todolist;