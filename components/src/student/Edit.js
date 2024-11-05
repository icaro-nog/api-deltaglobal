import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {

    const [formData, setFormData] = useState({
        id: 0,
        fieldName: '',
        fieldEmail: '',
        fieldAddress: '',
        fieldPhone: '',
        fieldPhoto: ''
    });
    
    const { id } = useParams();
    
    useEffect(() => {

        const url = 'http://localhost:8080/api/student/get/' + id

        axios.get(url)
            .then( response => {

                const res = response.data

                console.log(res)

                if(res.success){

                    setFormData(prevState => ({
                        ...prevState,
                        fieldName: res.data.name,
                        fieldEmail: res.data.email,
                        fieldAddress: res.data.address,
                        fieldPhone: res.data.phone,
                        fieldPhoto: res.data.photo,
                    }))

                }
            })
            .catch(error => {
                alert("Error 500" + error)
            })

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onClickUpdate = () => {

        const url = 'http://localhost:8080/api/student/update/' + id;

        const data = {
            name: formData.fieldName,
            email: formData.fieldEmail,
            phone: formData.fieldPhone,
            address: formData.fieldAddress,
            photo: formData.fieldPhoto,
        }

        axios.put(url, data)
            .then(response => {
                alert(response.data.message)
            })
            .catch(error => {
                alert('Erro 500' + error)
            })

    };
    
    return (
        <div>
            <h4> Consulta aluno </h4>
            <hr />
            <div class="row">
                <div class="col-md-6 mb-3">
                <label for="fieldName">Nome</label>
                <input type="text" class="form-control"
                    value={formData.fieldName}
                    onChange={handleChange}
                    name='fieldName'
                />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                            <label for="email">E-mail</label>
                    <input type="email" class="form-control" 
                        value={formData.fieldEmail}
                        onChange={handleChange}
                        name='fieldEmail'
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                            <label for="address">Telefone </label>
                    <input type="text" class="form-control" 
                        value={formData.fieldPhone}
                        onChange={handleChange}
                        name='fieldPhone'
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                            <label for="address">Endereço</label>
                    <input type="text" class="form-control" 
                        value={formData.fieldAddress}
                        onChange={handleChange}
                        name='fieldAddress'
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-5">
                                <label for="photo">Foto</label>
                    <br/>
                    <input type="file"
                        value={formData.fieldPhoto}
                        onChange={handleChange}
                        name='fieldPhoto'
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                <button onClick={onClickUpdate} class="btn btn-primary btn-block" type="submit">Salvar</button>
                </div>
            </div>
        </div>
    )

}

export default Edit;