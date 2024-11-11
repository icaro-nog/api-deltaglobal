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
    
    const token = localStorage.getItem('auth_token');

    console.log('Mounted app Component List')

    axios.get('http://localhost:8080/api/student/list', { headers: { Authorization: `Bearer ${token}` }})
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
              <th scope="col">Foto</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>

            {
              this.state.listStudent.map((data, i)=>{
                return(

                    <tr>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.address}</td>
                      <td>{data.phone}</td>
                      <td> <img src={data.photo} width="30" height="50" /> </td>
                      <td>
                        <Link to={"/student/edit/"+data.id} class="btn btn-light mr-3"> Editar </Link>
                        <Link onClick={()=>this.onClickDelete(i, data.id)} class="btn btn-danger"> Deletar </Link>
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

  onClickDelete(i, id){
    var yes = confirm('Deseja confirmar a ação?')

    if(yes == true){

      const token = localStorage.getItem('auth_token');

      const urlDelete = 'http://localhost:8080/api/student/delete/' + id

      axios.delete(urlDelete, { headers: { Authorization: `Bearer ${token}` }})
            .then(response => {

                const res = response.data
                if(res.success){

                  const list = this.state.listStudent
                  list.splice(i, 1)
                  this.setState({listStudent:list})
  
                  alert(res.message)

                }
            })
            .catch(error => {
                alert('Erro 500' + error)
            })

    }
  }

}