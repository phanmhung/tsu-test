import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { User } from '../redux/api/types';
import { useDeleteUserMutation, useGetAllQuery } from '../redux/api/userApi';
import ModalCreate from './ModalCreate';
import { Link } from 'react-router-dom';

function ListUser() {
    const {data, isLoading} = useGetAllQuery();
    const [show, setShow] = React.useState(false);
    const [deleteUser,error] = useDeleteUserMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete(id:string){
    // remove user with id
    deleteUser(id);
    window.location.reload();
    
  }
  if (isLoading) return (<div>Loading...</div>);
  return (
    <Container className='mt-5'>
      <h1>Список пользователей</h1>
      <Button variant='primary' onClick={handleShow}>+</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Аватар</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Почта</th>
            
          </tr>
        </thead>
        <tbody>
          {data?.map((u:User, index)=>(
          <tr key={index}>
            <td>
              <Link to={`/${u.id}`}>
                <img src={u.avatar} alt={u.firstName} width='100px'/>
                <Button variant='primary' onClick={()=>handleDelete(u.id)}>Remove User</Button>
              </Link>
            </td>
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.patronymic}</td>
            <td>{u.email}</td>
          </tr>))}
        </tbody>
      </Table>
      <ModalCreate show={show} onHide={handleClose} listUser={data}/>
    </Container>
  );
}

export default ListUser;
