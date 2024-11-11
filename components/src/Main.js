import React, { Component } from "react";
import ReactDom from 'react-dom';

import Nav from './Nav';
import Edit from './student/Edit';
import Form from './student/Form';
import List from './student/List';
import Login from './student/Login';
import Register from './student/Register';
import { AuthProvider } from "./AuthContext";

import { PrivateRoute } from "./privateRoute";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

export default class Main extends Component {
    render(){
        return(
            <AuthProvider>
                <Router>
                    <main>
                        <Routes>
                            <Route path="/login" element={<Login />} ></Route>
                            <Route path="/register" element={<Register />} ></Route>

                            <Route 
                                path="/student"
                                element={
                                    <PrivateRoute>
                                        <Nav />
                                    </PrivateRoute>
                                }
                            />

                            <Route 
                                path="/student/index"
                                element={
                                    <PrivateRoute>
                                        <Nav />
                                        <List />
                                    </PrivateRoute>
                                }
                            />

                            <Route 
                                path="/student/form"
                                element={
                                    <PrivateRoute>
                                        <Nav />
                                        <Form />
                                    </PrivateRoute>
                                }
                            />

                            <Route 
                                path="/student/edit/:id"
                                element={
                                    <PrivateRoute>
                                        <Nav />
                                        <Edit />
                                    </PrivateRoute>
                                }
                            />

                        </Routes>
                    </main>
                </Router>
            </AuthProvider>
        )
    }
}

ReactDom.render(<Main />, document.getElementById('main-student'));