import React, { useState } from "react";
import axios from "axios";

const ModifyClasses = () => {
  // Estado para datos generales de la clase
  const [classId, setClassId] = useState("");
  const [ciInstructor, setCiInstructor] = useState("");
  const [turnoId, setTurnoId] = useState("");

  // Estado para manejar alumnos
  const [addStudents, setAddStudents] = useState([]);
  const [removeStudents, setRemoveStudents] = useState([]);
  const [newStudent, setNewStudent] = useState("");

  // Mensajes de éxito o error
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Agregar alumnos a la lista de agregar
  const handleAddStudent = () => {
    if (newStudent.trim() && !addStudents.includes(newStudent.trim())) {
      setAddStudents([...addStudents, newStudent.trim()]);
      setNewStudent("");
    }
  };

  // Agregar alumnos a la lista de quitar
  const handleRemoveStudent = () => {
    if (newStudent.trim() && !removeStudents.includes(newStudent.trim())) {
      setRemoveStudents([...removeStudents, newStudent.trim()]);
      setNewStudent("");
    }
  };

  // Enviar solicitud para modificar la clase
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...(ciInstructor && { ci_instructor: ciInstructor }), // Solo incluir si tiene valor
      ...(turnoId && { id_turno: parseInt(turnoId) }), // Solo incluir si tiene valor
      ...(addStudents.length > 0 && { agregar_alumnos: addStudents }), // Solo si hay alumnos para agregar
      ...(removeStudents.length > 0 && { quitar_alumnos: removeStudents }), // Solo si hay alumnos para quitar
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/clases/${classId}/`,
        payload
      );
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.detail || "Error al modificar la clase");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Modificar Clase</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>ID de la Clase:</label>
          <input
            type="text"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            required
          />
        </div>
        <hr />

        {/* Modificar Instructor y Turno */}
        <h3>Modificar Detalles de la Clase</h3>
        <div>
          <label>CI del Instructor (opcional):</label>
          <input
            type="text"
            value={ciInstructor}
            onChange={(e) => setCiInstructor(e.target.value)}
          />
        </div>
        <div>
          <label>ID del Turno (opcional):</label>
          <input
            type="text"
            value={turnoId}
            onChange={(e) => setTurnoId(e.target.value)}
          />
        </div>
        <hr />

        {/* Modificar Alumnos */}
        <h3>Modificar Alumnos</h3>
        <div>
          <label>Nuevo Alumno:</label>
          <input
            type="text"
            value={newStudent}
            onChange={(e) => setNewStudent(e.target.value)}
          />
          <button type="button" onClick={handleAddStudent}>
            Agregar
          </button>
          <button type="button" onClick={handleRemoveStudent}>
            Quitar
          </button>
        </div>
        <div>
          <h4>Alumnos para Agregar:</h4>
          <ul>
            {addStudents.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Alumnos para Quitar:</h4>
          <ul>
            {removeStudents.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
        </div>
        <hr />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ModifyClasses;