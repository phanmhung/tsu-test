import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDeleteUserMutation, useGetAllQuery } from '../redux/api/userApi';
import ModalCreate from './ModalCreate';
import { Link } from 'react-router-dom';
import './ListUser.css';

function ListUser() {
  const { data, isLoading } = useGetAllQuery();
  const [show, setShow] = React.useState(false);
  const [deleteUser] = useDeleteUserMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete(id: string) {
    // remove user with id
    deleteUser(id);
    window.location.reload();
  }
  if (isLoading) return <div>Loading...</div>;
  if (data === undefined) return <div>Something is wrong</div>;
  return (
    <Container className="mt-5">
      <section>
        <div className="row d-flex justify-content-center">
          <div className="col-md-10 col-xl-8 text-center">
            <h3 className="mb-4">Список пользователей</h3>
            <Button
              variant="primary"
              className="mb-4 mb-md-5"
              onClick={handleShow}
            >
              Создать пользователя
            </Button>
          </div>
        </div>

        <div className="row text-center">
          {data.map((u,index)=>(
          <div className="col-md-4 mb-5 mb-md-0" key={index}>
            
            <div className="card testimonial-card mb-5">
              <div
                className="card-up"
                style={{ backgroundColor: '#9d789b' }}
              ></div>
              <div className="avatar mx-auto bg-white">
              <Link to={`/${u.id}`}>
                <img
                height={100}
                width={100}
                  src={u.avatar}
                  alt="avatar"
                  className="rounded-circle"
                />
                </Link>
              </div>
              <div className="card-body">
                <h4 className="mb-4">{u.firstName} {u.lastName}</h4>
                <hr />
                <span>{u.email}</span>
                <p className="dark-grey-text mt-4">
                  <i className="fas fa-quote-left pe-2"></i>
                  {u.about !== "" ? u.about : "Nothing about him"}
                </p>
                <Button variant='primary' onClick={()=>handleDelete(u.id)}>Remove User</Button>
              </div>
            </div>

          </div>))}
          
        </div>
      </section>
      <ModalCreate show={show} onHide={handleClose} listUser={data} />
    </Container>
  );
}

export default ListUser;
