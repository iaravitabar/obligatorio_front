import React, { useEffect, useState } from 'react';

const Classes = () => {
  const [clases, setClases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await fetch('/clases/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        console.log('Response text:', text); // Agrega este log para ver la respuesta
        const data = JSON.parse(text);
        setClases(data);
      } catch (error) {
        console.error('Error fetching clases:', error);
        setError(error.message);
      }
    };

    fetchClases();
  }, []);

  return (
    <div>
      <h1>Clases del Dia</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {clases.map(clase => (
          <li key={clase.id}>
            ID: {clase.id}, Instructor: {clase.ci_instructor}, Actividad: {clase.id_actividad}, Turno: {clase.id_turno}, Dictada: {clase.dictada}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classes;