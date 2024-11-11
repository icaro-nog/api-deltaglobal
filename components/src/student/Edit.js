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

    const [file, setFile] = useState({
        fieldPhoto: ''
    })
    const [fileName, setFileName] = useState('Choose File')
    const [selectedFile, setSelectedFile] = useState({
        filePath: '',
        fileName: ''
    })
    
    const { id } = useParams();
    const token = localStorage.getItem('auth_token');
    
    useEffect(() => {

        const url = 'http://localhost:8080/api/student/get/' + id

        axios.get(url, { headers: { Authorization: `Bearer ${token}` }})
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

    const handleFileSelect = (event) => {

        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
    
    }

    const onClickUpdate = () => {

        const url = 'http://localhost:8080/api/student/update/' + id;

        const formDataInstance = new FormData();
        formDataInstance.append('name', formData.fieldName);
        formDataInstance.append('email', formData.fieldEmail);
        formDataInstance.append('phone', formData.fieldPhone);
        formDataInstance.append('address', formData.fieldAddress);
        formDataInstance.append('photo', file);

        formDataInstance.append('_method', 'put');
        
        axios.post(url, formDataInstance, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } })
            .then(response => {
                alert(response.data.message)
                window.location.reload();
            })
            .catch(error => {
                alert('Erro 500' + error)
                console.log('catch')
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
                            <label for="fieldEmail">E-mail</label>
                    <input type="email" class="form-control" 
                        value={formData.fieldEmail}
                        onChange={handleChange}
                        name='fieldEmail'
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                            <label for="fieldPhone">Telefone </label>
                    <input type="text" class="form-control" 
                        value={formData.fieldPhone}
                        onChange={handleChange}
                        name='fieldPhone'
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                            <label for="fieldAddress">Endereço</label>
                    <input type="text" class="form-control" 
                        value={formData.fieldAddress}
                        onChange={handleChange}
                        name='fieldAddress'
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-5">
                                <label for="fieldPhoto">Foto</label>
                    <br/>
                    <input type="file"
                        onChange={handleFileSelect}
                        name='fieldPhoto'
                    />
                    <img src={formData.fieldPhoto} width="100" height="150" />
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