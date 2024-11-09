import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../Styles/Home.module.css';

function Home() {
  const [activity, setActivity] = useState([]);

  const getActivity = async () => {
    try {
      const response = await fetch('http://localhost:8000/actividades/');
      if (response.ok) { 
        const data = await response.json();
        console.log("Actividades recibidas:", data);
        setActivity(data);
      } else {
        console.error("Error al obtener actividades:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };
  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenido a la API de la Escuela de Deportes de Nieve</h1>
      <h2>Actividades</h2>

      <div className="activity-list">
        {activity.length > 0 ? (
          activity.map((activityItem) => (
            <Card
              key={activityItem.id}
              id={activityItem.id}
              descripcion={activityItem.descripcion}
              costo={activityItem.costo}
              onActivityDeleted={() => setActivity(activity.filter(g => g.id !== activityItem.id))}
            />
          ))
        ) : (
          <p>No se encontraron actividades.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
