import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useFirebaseApp } from 'reactfire';
import './Auth.css'; // Importamos los estilos

const Auth = ({ onLogin }) => {
  const firebaseApp = useFirebaseApp(); // Inicializamos Firebase App
  const auth = getAuth(firebaseApp); // Obtenemos la instancia de auth

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login y registro

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userEmail', email); // Guardamos el email en localStorage
      onLogin(); // Notificamos que el usuario ha iniciado sesión
    } catch (err) {
      setError('Error: Verifica tus credenciales');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userEmail', email); // Guardamos el email en localStorage
      onLogin(); // Notificamos que el usuario ha creado la cuenta e inició sesión
    } catch (err) {
      setError('Error: No se pudo crear la cuenta');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
        </button>
      </form>
      <button
        className="toggle-button"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering
          ? '¿Ya tienes una cuenta? Inicia sesión'
          : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
};

export default Auth;
