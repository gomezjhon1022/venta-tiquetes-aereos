import React from 'react';
import './Nav.css';

export const Nav = ({ state, send }) => {

  return (
    <nav className='Nav'>
      <h1 className='Nav-logo'>Agenda un vuelo ✈</h1>
        <button className='Nav-cancel button-secondary'>Cancelar</button>
    </nav>
  );
};