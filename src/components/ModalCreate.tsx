import { Button, Modal } from 'react-bootstrap';

import { User } from '../redux/api/types';
import { useCreateUserMutation } from '../redux/api/userApi';
import { AddUserForm } from './FormData';

function ModalCreate({
  show,
  onHide,
  listUser,
}: {
  show: boolean;
  onHide: () => void;
  listUser?: User[];
}) {
  const [create] = useCreateUserMutation();

  const handleSubmit = async (value: any) => {
    try{ 
        //save user
        await create(value);
        window.location.reload();
    }
    catch(error){
        console.log(error);
    }
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddUserForm handleSubmit={handleSubmit}/>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreate;
