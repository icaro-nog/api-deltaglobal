// criar formulário de login com js
// controller com login para recebimento da requisição feita com axios
// bloqueio de acesso as rotas, se não estiver logado ok

import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
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

        // const formDataInstance = new FormData();
        // formDataInstance.append('user', formData.fieldUser);
        // formDataInstance.append('password', formData.fieldPassword);

        const data = {
            email: formData.fieldEmail,
            password: formData.fieldPassword
        }

        // formDataInstance.append('_method', 'put');
        
        axios.post(url, data)
            .then(response => {
                // alert(response)
                console.log(response)
                // window.location.reload();

                // mandar pra página de listagem
                // com session ativa no privateRoute.js


            })
            .catch(error => {
                alert('Erro 500' + error)
            })

    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Login</h5>
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