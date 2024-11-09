import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  if (!activity) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="details-container">
      <h2>{activity.descripcion}</h2>
      <p>Costo: ${activity.costo}</p>
      <p>Duración: {activity.duracion || "No especificada"}</p>
      <p>Requisitos de edad: {activity.edad_minima || "Sin mínimo"} - {activity.edad_maxima || "Sin máximo"}</p>
    </div>
  );
};

export default ActivityDetails;