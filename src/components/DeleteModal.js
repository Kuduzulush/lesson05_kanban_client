import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DeleteModal({ task, deleteTask }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const okButtonHandler = () => {
    deleteTask(task._id)
    toggle();
  }

  return (
    <>
      <Button color="danger" onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete task</ModalHeader>
        <ModalBody>
          Do you want to delete this task: <b>{task.name}</b>?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={okButtonHandler} >
            OK
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DeleteModal;