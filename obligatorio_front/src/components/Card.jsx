import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ id, descripcion, costo, emoji}) { 


  return (
      <div className={styles.Card}>
            <h1>{emoji}</h1>
          <h2>{descripcion}</h2>
          <h3>${costo}</h3>
          <Link to={`/actividades/${id}`}>
          <button className={styles.detailsBtn}>Detalles</button>
          </Link>
            <Link to={`/inscripciones`}> 
            {/* tiene que redirigiar al post de clase pa inscribirse */}
            <button className={styles.inscriptionBtn}>Incsribirse</button> 
            </Link>
      </div>
  );
}

export default Card;

