import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Main from "./component/Main.jsx"
import Add_table from "./component/Add_table.jsx"
import Table from "./component/Table.jsx"
import Edit_table from "./component/Edit_table.jsx"
import Login from "./component/Login.jsx"
import Signup from "./component/Signup.jsx"
import Test from "./component/Test.jsx"
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  };

  
  render() {
      return(
        <Fragment>
          <Router>
            <Route path='/' exact={true} component={Main} />
              <Switch>
                <Route path="/add_table" component={Add_table} />
                <Route path="/table/:id" component={Table} />
                <Route path="/edit_table/:id" component={Edit_table} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />   
                <Route path="/test" component={Test} />
              </Switch>
          </Router>
        </Fragment>
      )
  };
};

export default App;
