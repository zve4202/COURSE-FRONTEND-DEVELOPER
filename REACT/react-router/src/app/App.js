import { Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/navBar";
import Posts from "./components/posts";

function App() {
  return (
    <div>
      <NavBar />
      <h1>App</h1>
      <Route path="/login" component={Login} />
      <Route path="/posts" component={Posts} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Home} />
    </div>
  );
}

export default App;
