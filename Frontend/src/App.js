import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import Login from './components/login/Login';
import CreateAccount from './components/createAccount/CreateAccount';
import Course from './components/course/Course';
import Instructor from './components/instructor/Instructor';
import Assignment from './components/assignment/Assignment';
import Student from './components/student/Student';
import Grade from './components/grade/Grade';

function App() {
  return (
    <Router>
      <div className="App">
        <Homepage />
        <Switch>
          <Route path="/students" component={Student} />
          <Route path="/instructor" component={Instructor} />
          <Route path="/assignment" component={Assignment} />
          <Route path="/courses" component={Course} />
          <Route path="/grade" component={Grade} />
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
