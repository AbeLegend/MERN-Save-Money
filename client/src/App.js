// lib
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// local
import Index from "./pages/Index/Index.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
// Private Route
import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
