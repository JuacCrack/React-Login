import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setUsersCookie, getUsersCookie } from '../utils/cookies';
import { Modal, Button } from 'react-bootstrap';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/.test(password);
  const validatePhoneNumber = (phoneNumber) =>
    /^\d{10}$/.test(phoneNumber);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    setPasswordValid(validatePassword(e.target.value));
  };

  const handlePhoneNumberInput = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberValid(validatePhoneNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailValid || !passwordValid || !phoneNumberValid) {
      setModalMessage('Por favor, corrija los campos inválidos.');
      setModalButtons([<Button onClick={() => setShowModal(false)}>Cerrar</Button>]);
      setShowModal(true);
      return;
    }

    const users = getUsersCookie();
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      setModalMessage('Este correo ya está registrado.');
      setModalButtons([
        <Button onClick={() => window.location.href = '/'}>Ir al Acceso</Button>,
        <Button onClick={() => setShowModal(false)}>Cerrar</Button>
      ]);
      setShowModal(true);
      return;
    }

    const newUser = { email, password, firstName, lastName, phoneNumber };
    users.push(newUser);
    setUsersCookie(users);

    setModalMessage('Usuario registrado correctamente.');
    setModalButtons([<Button onClick={() => window.location.href = '/'}>Ir al Acceso</Button>]);
    setShowModal(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '20rem' }}>
        <h3 className="text-center mb-4">Crear Cuenta</h3>
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${passwordValid ? '' : 'is-invalid'}`}
              id="password"
              value={password}
              onInput={handlePasswordInput}
              required
            />
            <div className="invalid-feedback">
              La contraseña debe tener al menos una mayúscula, un carácter especial y al menos 6 caracteres.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Número de Celular</label>
            <input
              type="tel"
              className={`form-control ${phoneNumberValid ? '' : 'is-invalid'}`}
              id="phoneNumber"
              value={phoneNumber}
              onInput={handlePhoneNumberInput}
              required
            />
            <div className="invalid-feedback">Número de teléfono no válido.</div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Guardar</button>
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
          <Modal.Title>Registro</Modal.Title>
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

export default Register;
