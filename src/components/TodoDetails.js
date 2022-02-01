import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const [modalRemove, setModalRemove] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTodo(null);
    setTimeout(() => {
      fetch("http://localhost:8000/todos/" + id)
        .then((res) => {
          if (!res.ok) {
            throw Error("The data you are looking for is not exist");
          }
          return res.json();
        })
        .then((data) => {
          setIsLoading(false);
          setTodo(data);
          setError(null);
          setChecked(data.isComplete);
          console.log(data);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
          setTodo(null);
        });
    }, 2000);
  }, [checked]);

  const getDataFetch = (id) => {
    return fetch("http://localhost:8000/todos/" + id)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };

  const handleChecked = async (id) => {
    const dataTarget = await getDataFetch(id);
    const { activity, description, type, isComplete } = dataTarget;
    const updatedData = {
      id,
      activity,
      description,
      type,
      isComplete: !isComplete,
    };

    // Set the checked state into the reverse of current isComplete property. When the current isComplete is true, make it false, vise versa
    setChecked(!isComplete);

    fetch("http://localhost:8000/todos/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }).then(() => {
      console.log("Data Successfully updated");
    });
  };

  const handleRemove = (id) => {
    fetch("http://localhost:8000/todos/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("Todo removed!");
      history.push("/");
    });
  };

  return (
    <div className="details-container">
      {todo && (
        <>
          <div className="details-heading">
            <div className="left-heading">
              <h3>{todo.activity}</h3>
              <p>Type: {todo.type}</p>
              <p>
                Status:{" "}
                <span
                  style={{
                    color: todo.isComplete ? "green" : "red",
                  }}
                >
                  {todo.isComplete ? "Complete" : "On Going"}
                </span>
              </p>
            </div>
            <div className="input-group-2">
              <label
                htmlFor="complete"
                style={{
                  color: todo.isComplete ? "#333333" : "#aaaaaa",
                }}
              >
                {todo.isComplete ? "Mark as uncomplete" : "Mark as complete"}
              </label>
              <input
                type="checkbox"
                id="complete"
                checked={checked}
                onChange={() => handleChecked(todo.id)}
              />
            </div>
          </div>
          <div className="details-content">
            <p>{todo.description}</p>
          </div>
          <div className="btn-trigger">
            <Link className="btn-back" to={"/"}>
              Back
            </Link>
            <button className="btn-remove" onClick={() => setModalRemove(true)}>
              Remove Activity
            </button>
          </div>
        </>
      )}

      {isLoading && (
        <div className="loading-section">
          <BeatLoader color={"#0D488D"} loading={isLoading} size={20} />
        </div>
      )}

      {error && <div className="error-msg">{error}</div>}

      {modalRemove && (
        <div className="modal">
          <div className="modal-body">
            <h4>Are you sure want to delete the activity?</h4>
            <div className="btn-trigger">
              <button
                className="btn-back"
                onClick={() => setModalRemove(false)}
              >
                Cancel
              </button>
              <button
                className="btn-remove"
                onClick={() => handleRemove(todo.id)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetails;
