import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch}from 'react-router-dom'
import ListIssueComponent from './ListIssueComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import CreateIssuesComponent from './CreateIssuesComponent';
import UpdateIssueComponent from './UpdateIssueComponent';
import ViewIssueComponent from './ViewIssueComponent';

function App() {
  return (
    <div>
      <Router>
                <HeaderComponent />
                      <div className="container">
                        <Switch> 
                          <Route path = "/" exact component = {ListIssueComponent}></Route>
                          <Route path = "/issues" component = {ListIssueComponent}></Route>
                          <Route path = "/add-issues/:id" component = {CreateIssuesComponent}></Route>
                          <Route path = "/update-issues/:id" component = {UpdateIssueComponent}></Route>
                          <Route path = "/view-issues/:id" component = {ViewIssueComponent}></Route>
                        </Switch>
                      </div>
                <FooterComponent />
          </Router>
    </div>
    
  );
}

export default App;
