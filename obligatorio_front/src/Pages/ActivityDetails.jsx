import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../Styles/ActivityDetails.module.css';

const ActivityDetails = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/actividades/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la actividad");
        }
        return response.json();
      })
      .then((data) => {
        // hay que pasar el array en un objeto, aca lo hice
        const actividadTransformada = {
          id: data[0],
          descripcion: data[1],
          costo: data[2],
          emoji: data[3],
        };
        setActivity(actividadTransformada);
      })
      .catch((error) => console.error(error));
  }, [id]);
  // const handleEnroll = () => {
  //   alert('¡Inscripción exitosa!');
  // };

  if (!activity) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <h1>{activity.emoji}</h1>
      <h2>{activity.descripcion}</h2>
      <p>Costo: ${activity.costo}</p>
      <p>Turno Matutino: {"09:00:00 - 11:00:00"}</p>
      <p>Turno Vespertino: {"12:00:00 - 14:00:00"}</p>
      <p>Turno Nocturno: {"16:00:00 - 18:00:00"}</p>
      <p>Requisitos de edad: {"mayores de 18 años"}</p>
      {/* <button onClick={handleEnroll}>Inscribirse</button> */}
      <Link to="/Home">
        <button className={styles.detailsBtn}>Atrás</button>
      </Link>
    </div>
  );
};

export default ActivityDetails;