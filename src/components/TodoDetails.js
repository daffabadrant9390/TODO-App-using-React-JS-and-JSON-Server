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
  const [successRemoveModal, setSuccessRemoveModal] = useState(false);

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
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
          setTodo(null);
        });
    }, 2000);
  }, [checked]);

  // * Function to fetch the data by the id, then update the isComplete attribute
  const handleChecked = async (id) => {
    const updatedData = {
      id: todo.id,
      activity: todo.activity,
      description: todo.description,
      type: todo.type,
      isComplete: !todo.isComplete,
    };

    // Set the checked state into the reverse of current isComplete property. When the current isComplete is true, make it false, vise versa. This is to trigger the useEffect hooks to run
    setChecked(!todo.isComplete);

    fetch("http://localhost:8000/todos/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }).then(() => {
      console.log("Data Successfully updated");
    });
  };

  // * Function to handle when we remove the activity
  const handleRemove = (id) => {
    fetch("http://localhost:8000/todos/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("Todo removed!");
      setModalRemove(false);
      setSuccessRemoveModal(true);
    });

    setTimeout(() => {
      history.push("/");
    }, 4000);
  };

  return (
    <div className="details-container">
      {successRemoveModal && (
        <div className="modal">
          <div className="modal-body">
            <img
              src="../images/checked.png"
              className="icon-success fade-in"
              alt="success alert"
            />
            <p>Successfully remove the activity</p>
          </div>
        </div>
      )}

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
            <Link className="btn btn-medium btn-primary" to={"/"}>
              Back
            </Link>
            <button
              className="btn btn-medium btn-danger"
              onClick={() => setModalRemove(true)}
            >
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
                className="btn btn-medium btn-primary"
                onClick={() => setModalRemove(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-medium btn-danger"
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
