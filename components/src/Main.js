import React, { Component } from "react";
import ReactDom from 'react-dom';

import Nav from './Nav';
import Edit from './student/Edit';
import Form from './student/Form';
import List from './student/List';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams
} from 'react-router-dom';

export default class Main extends Component {
    render(){
        return(
            <Router>
                <main>
                    <Nav />
                    <Routes>
                        <Route path="/student/index" exact element={<List />} ></Route>
                        <Route path="/student/form" element={<Form />} ></Route>
                        <Route path="/student/edit/:id" element={<Edit />} ></Route>
                    </Routes>
                </main>
            </Router>
        )
    }
}

// <div id="main-student"></div>
ReactDom.render(<Main />, document.getElementById('main-student'));