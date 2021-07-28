import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddCard from '../Form/AddCard';

const Modals = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        onClick={handleShow}
        variant='outline-warning'
        style={{ fontSize: '16px', padding: '1px 7px' }}
      >
        <i className='bi bi-file-earmark-plus'> Add Card</i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <AddCard handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default Modals;
