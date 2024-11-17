import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from '../Styles/Inscriptions.module.css';

const Inscriptions = () => {
  const [instructors, setInstructors] = useState([]);
  const [activities, setActivities] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [formData, setFormData] = useState({
    ci_instructor: "",
    id_actividad: "",
    id_turno: "",
    dictada: false,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instructorsRes, activitiesRes, shiftsRes] = await Promise.all([
          axios.get("http://localhost:8000/instructores/"),
          axios.get("http://localhost:8000/actividades/"),
          axios.get("http://localhost:8000/turnos/"),
        ]);
  
        console.log("Instructores cargados:", instructorsRes.data);
        console.log("Actividades cargadas:", activitiesRes.data);
        console.log("Turnos cargados:", shiftsRes.data);
  
        setInstructors(instructorsRes.data);
        setActivities(activitiesRes.data);
        setShifts(shiftsRes.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/clases/", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Error al procesar la inscripción");
    }
  };
  const formatHour = (hour) => {
    const str = Math.floor(hour).toString(); // Convierte el número a entero y luego a string
    const hours = str.slice(0, -4); // Extrae las primeras cifras (horas)
    const minutes = str.slice(-4, -2); // Extrae los minutos
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`; // Formatea como HH:MM
  };

  return (
    <div>
      <h1>Formulario de Clases</h1>
      <form onSubmit={handleSubmit}>
        {/* Selección de Instructor */}
        <div>
          <label>Instructor:</label>
          <select
            name="ci_instructor"
            value={formData.ci_instructor}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor[0]} value={instructor[0]}>
                {instructor[1]} {/* Suponiendo que el nombre está en la posición 1 */}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Actividad */}
        <div>
          <label>Actividad:</label>
          <select
            name="id_actividad"
            value={formData.id_actividad}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una actividad</option>
            {activities.map((activity) => (
              <option key={activity[0]} value={activity[0]}>
                {activity[1]} {/* Suponiendo que el nombre de la actividad está en la posición 1 */}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Turno */}
        <div>
          <label>Turno:</label>
          <select
            name="id_turno"
            value={formData.id_turno}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un turno</option>
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>
                {`${formatHour(shift.hora_inicio)} - ${formatHour(shift.hora_fin)}`}
              </option>
            ))} 
          </select>
        </div>

        <button type="submit">Crear Clase</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Inscriptions;
