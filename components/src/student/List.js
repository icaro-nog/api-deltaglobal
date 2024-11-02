import React, { Component } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class List extends Component {

  constructor(){
    super()
    this.state = {
      listStudent:[]
    }
  }

  componentDidMount(){

    console.log('Mounted app Component List')

    axios.get('http://localhost:8080/api/student/list')
      .then(response => {
        console.log(response.data)
        this.setState({listStudent:response.data.data})
      })
      .catch(error => {
        alert('Erro ' + error)
      })

  }

  render() {
    return (
      <section>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Endereço</th>
              <th scope="col">Telefone</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>

            {
              this.state.listStudent.map((data)=>{
                return(

                    <tr>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.address}</td>
                      <td>{data.phone}</td>
                      <td>
                        <Link to={"/student/edit/"+data.id} class="btn btn-light mr-3"> Editar </Link>
                        <Link to="/student/delete" class="btn btn-danger"> Deletar </Link>
                      </td>
                    </tr>

                )
              })
            }

          </tbody>
        </table>
      </section>
    )
  }
}