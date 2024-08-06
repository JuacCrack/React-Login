import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { getUsersCookie, setCurrentUserEmail } from '../utils/cookies';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  const handleVerificationCodeInput = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailValid) {
      setModalMessage('El correo no tiene un formato válido.');
      setModalButtons([<Button onClick={() => setShowModal(false)}>Cerrar</Button>]);
      setShowModal(true);
      return;
    }

    setIsSubmitting(true);

    const users = getUsersCookie();
    const user = users.find(user => user.email === email);

    if (!user) {
      setModalMessage('Este correo no está registrado.');
      setModalButtons([
        <Button onClick={() => window.location.href = '/register'}>Ir al Registro</Button>,
        <Button onClick={() => setShowModal(false)}>Cerrar</Button>
      ]);
      setShowModal(true);
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setCurrentUserEmail(email);
      setIsSubmitting(false);
      setIsCodeSent(true);
    }, 2000);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (verificationCode === '123456') {
      window.location.href = '/change-password';
    } else {
      setModalMessage('Código de verificación incorrecto.');
      setModalButtons([<Button onClick={() => setShowModal(false)}>Cerrar</Button>]);
      setShowModal(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '20rem' }}>
        <h3 className="text-center mb-4">Recuperar Contraseña</h3>
        {!isCodeSent ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo</label>
              <input
                type="email"
                className={`form-control ${emailValid ? '' : 'is-invalid'}`}
                id="email"
                value={email}
                onInput={handleEmailInput}
                required
              />
              <div className="invalid-feedback">Correo no válido.</div>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner animation="border" size="sm" />
              ) : (
                'Enviar Código'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit}>
            <div className="mb-3">
              <label htmlFor="verificationCode" className="form-label">Código de Verificación</label>
              <input
                type="text"
                className="form-control"
                id="verificationCode"
                value={verificationCode}
                onInput={handleVerificationCodeInput}
                required
              />
              <small className="form-text text-success">Pista: 123456</small>
            </div>
            <button type="submit" className="btn btn-primary w-100">Validar Código</button>
          </form>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={() => {}}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Recuperación de Contraseña</Modal.Title>
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

export default RecoverPassword;
