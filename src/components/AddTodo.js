import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useHistory } from "react-router-dom";
import "../App.css";

const AddTodo = () => {
  const activityType = ["Design", "Development", "Other"];
  const [activity, setActivity] = useState("");
  const [type, setType] = useState("Design");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const history = useHistory();

  const updateActivity = (e) => {
    setActivity(e.target.value);
  };

  const updateActivityType = (e) => {
    // console.log(e.target.value);
    setType(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isComplete = false;
    const finalTodo = {
      activity,
      type,
      description,
      isComplete,
    };
    // Set Loading mode
    setIsLoading(true);

    setTimeout(() => {
      fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalTodo),
      }).then(() => {
        // When the data is successfully submitted, remove loading mode
        setIsLoading(false);
        setSuccessModal(true);
        console.log("Successfully add new todo!");
      });
    }, 2000);

    setTimeout(() => {
      history.push("/");
    }, 6000);
  };

  return (
    <div className="add-todo-container">
      {successModal && (
        <div className="modal">
          <div className="modal-body">
            <img
              src="./images/checked.png"
              className="icon-success fade-in"
              alt="success alert"
            />
            <p>Successfully add new activity</p>
          </div>
        </div>
      )}

      <h1>Add Activity</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="activity">Activity</label>
          <input
            type="text"
            id="activity"
            placeholder="Enter new activity..."
            value={activity}
            onChange={updateActivity}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="type">Activity Type</label>
          <select id="type" value={type} onChange={updateActivityType} required>
            {activityType.map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Enter the description..."
            value={description}
            onChange={updateDescription}
            required
          ></textarea>
        </div>
        {isLoading ? (
          <button className="btn btn-medium btn-secondary" disabled>
            <BeatLoader color={"#0D488D"} loading={isLoading} size={14} />
          </button>
        ) : (
          <button className="btn btn-medium btn-submit" type="submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTodo;
