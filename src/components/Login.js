import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateCredentials } from '../utils/cookies';
import { Modal, Button } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = validateCredentials(email, password);

    if (user) {
      window.location.href = 'www.google.com';
    } else {
      setModalMessage('Usuario o contraseña incorrectos.');
      setShowModal(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '20rem' }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Acceder</button>
        </form>
        <div className="mt-3 d-flex justify-content-between">
          <Link to="/recover-password" className="small">Recuperar Contraseña</Link>
          <Link to="/register" className="small">Crear Cuenta</Link>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => {}}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
