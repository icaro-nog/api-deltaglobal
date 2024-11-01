import React, { Component } from "react";
import ReactDom from 'react-dom';

import Nav from './Nav';
import Edit from './customer/Edit';
import Form from './customer/Form';
import List from './customer/List';

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
                        <Route path="/customer/index" exact element={<List />} ></Route>
                        <Route path="/customer/form" element={<Form />} ></Route>
                        <Route path="/customer/edit/:id" element={<Edit />} ></Route>
                    </Routes>
                </main>
            </Router>
        )
    }
}

// <div id="main-customer"></div>
ReactDom.render(<Main />, document.getElementById('main-customer'));