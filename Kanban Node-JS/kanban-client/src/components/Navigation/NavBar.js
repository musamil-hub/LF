import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Modals from '../Modal/Modals';

const Header = () => {
  return (
    <Navbar
      bg='dark'
      variant='dark'
      style={{ height: '50px', borderRadius: '4px' }}
    >
      <Container>
        <Navbar.Brand href='#home'>Kanban Board</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <Modals />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
