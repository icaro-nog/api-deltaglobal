import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {

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

        const url = 'http://localhost:8080/api/register/create';

        const data = {
            email: formData.fieldEmail,
            password: formData.fieldPassword
        }
        
        axios.post(url, data)
            .then(response => {
                alert(response.data.message)
                window.location.href = '/login';
            })
            .catch(error => {
                alert('Erro ' + error)
            })

    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Novo login</h5>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">E-mail</label>
                        <input
                            type="email"
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
                    >Registrar</button>
                </div>
            </div>
        </div>
      )

}

export default Register;