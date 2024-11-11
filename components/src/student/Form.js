import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {

  const [formData, setFormData] = useState({
    id: 0,
    fieldName: '',
    fieldEmail: '',
    fieldAddress: '',
    fieldPhone: ''
  });

  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Choose File')
  const [selectedFile, setSelectedFile] = useState({
    filePath: '',
    fileName: ''
  })

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };
  
  const token = localStorage.getItem('auth_token');

  const onClickSave = () => {
    const baseUrl = 'http://localhost:8080/api/student/create';

    const formDataInstance = new FormData();
    formDataInstance.append('name', formData.fieldName);
    formDataInstance.append('email', formData.fieldEmail);
    formDataInstance.append('phone', formData.fieldPhone);
    formDataInstance.append('address', formData.fieldAddress);
    formDataInstance.append('photo', file);

    console.log('formDataInstance')
    console.log(formDataInstance)


    axios.post(baseUrl, formDataInstance, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } })
      .then(response => {
        alert(response.data.message)
        window.location = 'http://localhost:8080/student#/student/index';
      })
      .catch(error => {
        alert('Erro 500' + error)
      })
  }

  const handleFileSelect = (event) => {

    setFile(event.target.files[0])
    setFileName(event.target.files[0].name)

  }
  
  return (
    <div>
      <h4>Novo aluno</h4>
      <hr></hr>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="fieldName">Nome </label>
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
          <label for="phone">Telefone </label>
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
            onChange={handleFileSelect}
            id='fieldPhoto'
            name='fieldPhoto'
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <button class="btn btn-primary btn-block" type="submit"
            onClick={onClickSave}
          >Salvar</button>
        </div>
      </div>
    </div>
  )
}

export default Form;