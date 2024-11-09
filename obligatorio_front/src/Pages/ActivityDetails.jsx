import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Styles/ActivityDetails.module.css';

const ActivityDetails = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/actividades/${id}`);
        const data = await response.json();
        setActivity(data);
      } catch (error) {
        console.error("Error al obtener detalles de la actividad:", error);
      }
    };
    fetchActivityDetails();
  }, [id]);
  // const handleEnroll = () => {
  //   alert('¡Inscripción exitosa!');
  // };

  if (!activity) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="details-container">
      <h2>{activity.descripcion}</h2>
      <p>Costo: ${activity.costo}</p>
      <p>Turno Matutino: {"09:00:00 - 11:00:00"}</p>
      <p>Turno Vespertino: {"12:00:00 - 14:00:00"}</p>
      <p>Turno Nocturno: {"16:00:00 - 18:00:00"}</p>
      <p>Requisitos de edad: {"mayores de 18 años"}</p>
      {/* <button onClick={handleEnroll}>Inscribirse</button> */}
      <Link to="/Home">
            <button className="btn-atras">Atrás</button>
      </Link>
    </div>
  );
};

export default ActivityDetails;