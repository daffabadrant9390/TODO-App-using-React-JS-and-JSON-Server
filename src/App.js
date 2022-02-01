import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import TodoDetails from "./components/TodoDetails.js";
import AddTodo from "./components/AddTodo.js";
import ErrorNotFound from "./components/ErrorNotFound.js";
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add" component={AddTodo} />
          <Route path="/todo/:id" component={TodoDetails} />
          <Route path="*" component={ErrorNotFound} />
        </Switch>
      </div>
    </Routes>
  );
}

export default App;
