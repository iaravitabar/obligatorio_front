import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import styles from '../Styles/Home.module.css';

function Home() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/actividades/') 
      .then((response) => response.json())
      .then((data) => {
        const actividadesTransformadas = data.map((activity) => ({
          id: activity[0],
          descripcion: activity[1],
          costo: activity[2],
          emoji: activity[3],
        }));
        setActivity(actividadesTransformadas);
      })
      .catch((error) => console.error('Error al cargar actividades:', error));
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1>Bienvenido a la API de la Escuela de Deportes de Nieve</h1>
      <h2>Actividades</h2>

      <Link to="/CrearClase">
        <button className={styles.inscriptionButton}>Crear Clase</button>
      </Link>

      <Link to="/Clases">
        <button className={styles.inscriptionButton}>Ver Clases</button>
      </Link>

      <Link to="/ModificarClase">
        <button className={styles.inscriptionButton}>Modificar Clases</button>
      </Link>
      

      <div className={styles.activityList}>
        {activity.length > 0 ? (
          activity.map((activityItem) => (
            <div className={styles.activityCard} key={activityItem.id}>
              <Card
                key={activityItem.id}
                id={activityItem.id}
                emoji={activityItem.emoji}
                descripcion={activityItem.descripcion}
                costo={activityItem.costo}
              />
            </div>
          ))
        ) : (
          <p>No se encontraron actividades.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
