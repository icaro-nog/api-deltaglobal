import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        fieldEmail: '',
        fieldPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onClickSend = () => {

        const url = 'http://localhost:8080/api/login/store';

        const data = {
            email: formData.fieldEmail,
            password: formData.fieldPassword
        }
        
        axios.post(url, data)
            .then(response => {

                const { token, user } = response.data;

                if (token) {
                    localStorage.setItem('auth_token', token);
                    window.location.href = '/student';
                }


            })
            .catch(error => {
                alert('Erro ' + error)
            })

    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Login</h5>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Usuário</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fieldEmail"
                            name="fieldEmail"
                            value={formData.fieldEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="fieldPassword"
                            name="fieldPassword"
                            value={formData.fieldPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100"
                        onClick={onClickSend}
                    >Entrar</button>


                    <div className="mb-3 mt-3 text-center">
                        <Link to="/register"> Registre-se </Link>
                    </div>
                </div>
            </div>
        </div>
      )

}

export default Login;