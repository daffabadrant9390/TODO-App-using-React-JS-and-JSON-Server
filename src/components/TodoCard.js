import { Link } from "react-router-dom";

const TodoCard = (props) => {
  const { id, activity, type, isComplete } = props.todo;
  // const [checked, setChecked] = useState(isComplete);
  return (
    <>
      <h3
        style={{
          textDecoration: isComplete ? "line-through" : "",
        }}
      >
        {activity}
      </h3>
      <p>{type}</p>
      <p className="status-activities">
        Status :{" "}
        <span
          style={{
            color: isComplete ? "green" : "red",
          }}
        >
          {isComplete ? "Completed" : "On Going"}
        </span>
      </p>
      <Link className="btn-details" to={`/todo/${id}`}>
        Details
      </Link>
    </>
  );
};

export default TodoCard;
