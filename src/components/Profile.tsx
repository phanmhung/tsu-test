import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation } from '../redux/api/userApi';
import { AddUserForm } from './FormData';

const Profile: React.FC<{ id: string }> = ({ id }) => {
  const [show, setShow] = React.useState(false);
  const onHide = () => setShow(false);
  const handleShow = () => setShow(true);

  const [update] = useUpdateUserMutation();
  const handleSubmit = async (value: any) => {
    try{ 
        //save user
        await update(value);
        window.location.reload();
    }
    catch(error){
        console.log(error);
    }
  }

  //delete user
  const [deleteUser]= useDeleteUserMutation();
  
  const { data, isLoading } = useGetUserQuery(id);
  if (isLoading) return <div>Loading...</div>;
  if (data === undefined) return <div>Something is wrong</div>;
  const handleDelete = async () => {
    try{
        await deleteUser(data.id);
        // go back to home page
        window.location.href = "/";
    }
    catch(error){
        console.log(error);
    }
  }
  return (
    <section style={{ backgroundColor: '#9de2ff' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-8">
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <img
                      src={data.avatar}
                      alt="placeholder"
                      className="img-fluid"
                      style={{ width: '180px', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-1">
                      {data.lastName} {data.firstName} {data.patronymic}
                    </h5>
                    <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                      {data.email}
                    </p>
                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}
                    >
                      <div>
                        <p className="small text-muted mb-1">О пользователе</p>
                        <p className="mb-0">{data.about !== "" ? data.about : "Nothing about him. Let's update..."}</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <button
                        type="button"
                        className="btn btn-outline-primary me-1 flex-grow-1"
                        onClick={handleShow}
                      >
                        Редактировать
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary flex-grow-1"
                        onClick={handleDelete}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddUserForm handleSubmit={handleSubmit} inputInitialValues={data}/>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </section>
  );
};

export default Profile;
