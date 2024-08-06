import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { updateUserPassword, getCurrentUserEmail } from '../utils/cookies';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const email = getCurrentUserEmail();

  const isPasswordValid = (password) => /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d)[A-Za-z\d\W_]{6,}$/.test(password);

  const handleNewPasswordInput = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setNewPasswordValid(isPasswordValid(value));
  };

  const handleConfirmPasswordInput = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordValid(isPasswordValid(value));
    setPasswordsMatch(value === newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPasswordValid || !confirmPasswordValid || !passwordsMatch) {
      setModalMessage('Por favor, corrige los errores antes de continuar.');
      setModalButtons([<Button onClick={() => setShowModal(false)}>Cerrar</Button>]);
      setShowModal(true);
      return;
    }

    updateUserPassword(email, newPassword);

    setModalMessage('Contraseña cambiada con éxito.');
    setModalButtons([<Button onClick={() => window.location.href = '/'}>Ir al Login</Button>]);
    setShowModal(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '20rem' }}>
        <h3 className="text-center mb-4">Cambiar Contraseña</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
            <input
              type="password"
              className={`form-control ${newPasswordValid ? '' : 'is-invalid'}`}
              id="newPassword"
              value={newPassword}
              onInput={handleNewPasswordInput}
              required
            />
            <div className="invalid-feedback">La contraseña debe tener al menos 6 caracteres, una mayúscula y un carácter especial.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className={`form-control ${confirmPasswordValid && passwordsMatch ? '' : 'is-invalid'}`}
              id="confirmPassword"
              value={confirmPassword}
              onInput={handleConfirmPasswordInput}
              required
            />
            <div className="invalid-feedback">
              {confirmPasswordValid ? 'Las contraseñas no coinciden.' : 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un carácter especial.'}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Cambiar Contraseña</button>
        </form>
      </div>

      <Modal
        show={showModal}
        onHide={() => {}}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Cambio de Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          {modalButtons.map((button, index) => (
            <React.Fragment key={index}>{button}</React.Fragment>
          ))}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChangePassword;
