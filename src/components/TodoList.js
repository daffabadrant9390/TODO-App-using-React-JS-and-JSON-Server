import TodoCard from "./TodoCard.js";
import "../App.css";

const TodoList = ({ todos }) => {
  return (
    <div className="todos-container">
      {todos &&
        todos.map((todo) => {
          return (
            <div className="todo-detail fade-up" key={todo.id}>
              <TodoCard todo={todo} />
            </div>
          );
        })}
    </div>
  );
};

export default TodoList;
