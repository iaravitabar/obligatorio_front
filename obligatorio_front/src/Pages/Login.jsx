import React, { useEffect, useState } from "react";
import styles from '../Styles/Login.module.css';

function Login() {
  const [error, setError] = useState('')

  const validateForm = (e) => {
    if (!e.target.ci.value ) {
      return 'Por favor, completa los campos';
    }
    const ciRegex = /^[0-9]{6,8}$/;
    if (!ciRegex.test(e.target.email.value)) {
      return 'Ingresa una cedula válida';
    }
    if (e.target.ci.value.length < 6) {
      return 'La cedula debe tener al menos 8 caracteres';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ci: e.target.ci.value }), 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        document.cookie = `token=${data.token}; max-age=3600; path=/`;
        window.location.href = '/Home'; // Redirige al feed o página principal
      } else {
        setError(data.detail || 'Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error de servidor. Intenta más tarde.');
    }
  };
  return (
    <>
    <div className={styles.login_container}>
      <div className={styles.logo_container}>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mHTSm37W4mp-tlLh8OQrx-LpOiwptxLmRg&s" 
          alt="UCU logo" 
          className={styles.logo}
        />
      </div>
      <h1 className={styles.title}>Inicia Sesión</h1>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <input
          type="ci"
          placeholder="ci"
          id="ci"
          className={styles.login_input}
        />
        <button type="submit" className={styles.login_button}>Login</button>
      </form>
      <p className={styles.login_text}>
        Create account <a href="/register" className={styles.login_link}>here</a>
      </p>
    </div>
    </>
  );
}

export default Login;