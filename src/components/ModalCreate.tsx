import { Button, Modal } from 'react-bootstrap';

import { User } from '../redux/api/types';
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
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddUserForm userData={listUser}/>
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
