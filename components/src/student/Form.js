import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {

  constructor(){
    super()
    this.state = {
      fieldName: '',
      fieldEmail: '',
      fieldPhone: '',
      fieldAddress: '',
      fieldPhoto: ''
    }
  }

  render() {
    return (
      <div>
        <h4>Novo aluno</h4>
        <hr></hr>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Nome {this.state.fieldName} </label>
            <input type="text" class="form-control" 
              value={this.state.fieldName}
              onChange={(value)=>this.setState({fieldName:value.target.value})}
            />
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="email">E-mail</label>
	          <input type="email" class="form-control" 
              value={this.state.fieldEmail}
              onChange={(value)=>this.setState({fieldEmail:value.target.value})}
            />
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="phone">Telefone </label>
	          <input type="text" class="form-control" 
              value={this.state.fieldPhone}
              onChange={(value)=>this.setState({fieldPhone:value.target.value})}
            />
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="address">Endereço</label>
	          <input type="text" class="form-control" 
              value={this.state.fieldAddress}
              onChange={(value)=>this.setState({fieldAddress:value.target.value})}
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-5">
						<label for="photo">Foto</label>
            <br/>
	          <input type="file" 
              value={this.state.fieldPhoto}
              onChange={(value)=>this.setState({fieldPhoto:value.target.value})}
            />
          </div>
        </div>

				<div class="row">
					<div class="col-md-6 mb-3">
		      	<button class="btn btn-primary btn-block" type="submit"
              onClick={()=>this.onClickSave()}
            >Salvar</button>
					</div>
				</div>
      </div>
    )
  }

  onClickSave(){
    const baseUrl = 'http://localhost:8080/api/student/create';

    const dataPost = {
      name: this.state.fieldName,
      email: this.state.fieldEmail,
      phone: this.state.fieldPhone,
      address: this.state.fieldAddress,
      photo: this.state.fieldPhoto,
    }

    console.log(dataPost);

    axios.post(baseUrl, dataPost)
      .then(response => {
        alert(response.data.message)
      })
      .catch(error => {
        alert('Erro 500' + error)
      })
  }
}