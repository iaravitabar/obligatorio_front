import React from 'react';
import { Link } from 'react-router-dom';
import './Card.module.css';

function Card({ id, descripcion, costo, onActivityDeleted }) { 
  const deleteActivity = async () => {
      try {
          const response = await fetch(`http://localhost:8000/actividades/${id}`, {
              method: 'DELETE',
          });

          if (response.ok) {
              onActivityDeleted(id);
          } else {
              console.error('Error al eliminar la actividad', response.statusText);
          }
      } catch (error) {
          console.error('Error al eliminar la actividad:', error);
      }
  };

  return (
      <div className="card">
          <h2>{descripcion}</h2>
          <h3>${costo}</h3>
          <Link to={`/actividades/${id}`}>
              <button className="details-btn">Detalles</button>
          </Link>
          <button className="delete-btn" onClick={deleteActivity}>Borrar</button> 
      </div>
  );
}

export default Card;

