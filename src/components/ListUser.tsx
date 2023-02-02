import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useGetAllQuery } from '../redux/api/userApi';
import ModalCreate from './ModalCreate';

function ListUser() {
    const {data, isLoading} = useGetAllQuery();
    const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          {data?.map((u, index)=>(
          <tr key={index}>
            <td>
                <img src={u.avatar} alt={u.firstName} width='100px'/>
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
