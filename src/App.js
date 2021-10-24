import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';


import './App.css';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import {app, analytics, readData } from "./utils/firebase";
import {listData} from "./utils/dataFirebase";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Home from './pages/home';
import AboutUs from './pages/aboutus';
import Navbar from './components/customnav';
import SignInScreen from './pages/signinscreen';
import TimePeriod from './pages/timeperiods';
import Grade from './pages/manageGrade';
import ManageModules from './pages/managemodules';
import ManageQuestions from './pages/managequestions';

const { Header, Content, Footer } = Layout;



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const provider = new GoogleAuthProvider();
const auth = getAuth();

console.log(listData("grade-level"));

export default function App() {
  return (<>
    <Router>
      <Navbar/>
      <div>
        <Switch>
          <Route path="/time-periods">
            <TimePeriod/>
          </Route>
          <Route path="/grade">
            <Grade/>
          </Route>
          <Route path="/modules">
            <ManageModules/>
          </Route>
          <Route path="/questions">
            <ManageQuestions/>
          </Route>
          <Route path="/aboutus">
            <AboutUs/>
          </Route>
          <Route path="/login">
            <SignInScreen/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  </>);
}



function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}