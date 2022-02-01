import BeatLoader from "react-spinners/BeatLoader";
import useFetch from "../hooks/useFetch.js";
import TodoList from "./TodoList.js";
import "../App.css";

const Home = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/todos");
  return (
    <div className="todos-section">
      <h1>Activities</h1>
      {todos ? (
        <TodoList todos={todos} />
      ) : (
        <div className="error-msg">{error}</div>
      )}
      {isLoading && (
        <div className="loading-section">
          <BeatLoader color={"#0D488D"} loading={isLoading} size={20} />
        </div>
      )}
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export default Home;
