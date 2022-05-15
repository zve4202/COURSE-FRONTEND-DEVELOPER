import { Link, Route, Switch } from "react-router-dom";
import Edit from "./edit";
import Stats from "./stats";

const Dashboard = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/dashboard/edit">Edit</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/dashboard" component={Stats} />
        <Route path="/dashboard/edit" component={Edit} />
      </Switch>
    </div>
  );
};

export default Dashboard;
