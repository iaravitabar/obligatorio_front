import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Styles from '../Styles/InscriptionForm.module.css';

const InscriptionForm = () => {
  const [ciAlumno, setCiAlumno] = useState('');
  const [actividades, setActividades] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [equipamientos, setEquipamientos] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [formData, setFormData] = useState({
    id_actividad: '',
    ci_instructor: '',
    id_equipamiento: '',
    id_turno: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [actividadesRes, instructoresRes, equipamientosRes, shiftsRes] = await Promise.all([
          axios.get('http://localhost:8000/actividades/'),
          axios.get('http://localhost:8000/instructores/'),
          axios.get('http://localhost:8000/equipamientos/'),
          axios.get('http://localhost:8000/turnos/'),
        ]);

        console.log("Actividades cargadas:", actividadesRes.data);
        console.log("Instructores cargados:", instructoresRes.data);
        console.log("Equipamientos cargados:", equipamientosRes.data);
        console.log("Turnos cargados:", shiftsRes.data);

        setActividades(actividadesRes.data);
        setInstructores(instructoresRes.data);
        setEquipamientos(equipamientosRes.data);
        setShifts(shiftsRes.data);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      alumnos: [ciAlumno], // Lista de alumnos
      id_actividad: parseInt(formData.id_actividad),
      ci_instructor: formData.ci_instructor,
      id_equipamiento: formData.id_equipamiento
        ? parseInt(formData.id_equipamiento)
        : null, // Envía null si no hay equipamiento
      id_turno: parseInt(formData.id_turno),
    };
  
    console.log("Payload enviado:", payload);
  
    try {
      const response = await axios.post("http://localhost:8000/inscripciones/", payload);
      console.log("Respuesta del backend:", response.data);
      setMensaje(response.data.message);
      setError("");
    } catch (err) {
      console.error("Error al inscribirse:", err);
      setError(err.response?.data?.detail || "Error al inscribirse");
      setMensaje("");
    }
  };

  const formatHour = (hour) => {
    const str = Math.floor(hour).toString();
    const hours = str.slice(0, -4);
    const minutes = str.slice(-4, -2);
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Formulario de Inscripción</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cédula de Identidad:</label>
          <input
            type="text"
            value={ciAlumno}
            onChange={(e) => setCiAlumno(e.target.value)}
            required
          />
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
            {actividades.map((actividades) => (
              <option key={actividades[0]} value={actividades[0]}>
                {actividades[1]} {/* Suponiendo que el nombre de la actividad está en la posición 1 */}
              </option>
            ))}
          </select>
        </div>
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
            {instructores.map((instructores) => (
              <option key={instructores[0]} value={instructores[0]}>
                {instructores[1]} {/* Suponiendo que el nombre está en la posición 1 */}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Selecciona un Equipamiento (opcional):</label>
          <select name="id_equipamiento" value={formData.id_equipamiento} onChange={handleChange}>
            <option value="">-- Sin equipamiento --</option>
            {equipamientos.map((equip) => (
              <option key={equip.id} value={equip.id}>
                {equip.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Turno:</label>
          <select name="id_turno" value={formData.id_turno} onChange={handleChange} required>
            <option value="">Selecciona un turno</option>
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>
                {`${formatHour(shift.hora_inicio)} - ${formatHour(shift.hora_fin)}`}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Inscribirse</button>
      </form>
      <Link to="/Home">
        <button className={Styles.detailsBtn}>Atrás</button>
      </Link>
    </div>
  );
};

export default InscriptionForm;