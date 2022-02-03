import { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import useFetch from "../hooks/useFetch.js";
import TodoList from "./TodoList.js";
// import SearchTodo from "./SearchTodo.js";
import "../App.css";
import "../Animation.css";

const Home = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useFetch("https://todo-list-react-js-new.herokuapp.com/");

  const [query, setQuery] = useState("");
  const [updatedTodos, setUpdatedTodos] = useState([]);

  const updateQuery = (e) => {
    setQuery(e.target.value);
    if (todos) {
      // console.log(todos);
      let updateDataTodos = todos.filter((todo) => {
        return todo.activity.toLowerCase().includes(query.toLowerCase());
      });
      // console.log(updateDataTodos);
      setUpdatedTodos(updateDataTodos);
    }
  };

  return (
    <div className="todos-section">
      <div className="todos-section-heading">
        <div className="todos-heading-text">
          <h1>My Activities</h1>
          <p>All activities that i've been working on lately</p>
        </div>

        {/* START: Search Input - Todos */}
        <div className="search-todo-container">
          <input
            type="text"
            placeholder="Type your activity..."
            value={query}
            onChange={updateQuery}
          />
        </div>
        {/* END: Search Input - Todos */}
      </div>
      {todos ? (
        // When there are no query, display all todos from the json file
        query === "" ? (
          <TodoList todos={todos} />
        ) : (
          // If there is query, display only the todos based on what user type
          <TodoList todos={updatedTodos} />
        )
      ) : (
        // If the fetch process is failed, display an error
        <div className="error-msg">{error}</div>
      )}

      {isLoading && (
        <div className="loading-section">
          <BeatLoader color={"#0D488D"} loading={isLoading} size={16} />
        </div>
      )}
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export default Home;
