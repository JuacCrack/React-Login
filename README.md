# Login React App


## Descripción


Este es un proyecto de aplicación de inicio de sesión y registro utilizando React. El proyecto incluye funcionalidades para el login, registro de nuevos usuarios, recuperación de contraseña y cambio de contraseña, todo del lado del cliente. El diseño es responsive y utiliza Bootstrap 5 para la interfaz de usuario.
 
## Estructura del Proyecto


La estructura del proyecto es la siguiente:
 
    login-react/

    ├── node_modules/

    ├── public/

    │   ├── index.html

    │   └── ...

    ├── src/

    │   ├── components/

    │   │   ├── ChangePassword.js

    │   │   ├── Login.js

    │   │   ├── RecoverPassword.js

    │   │   └── Register.js

    │   ├── utils/

    │   │   └── cookies.js

    │   ├── App.js

    │   ├── index.js

    │   └── ...

    ├── package.json

    ├── package-lock.json

    └── ...


## Componentes


### Login.js


El componente de Login incluye un formulario con campos para el correo y la contraseña. Realiza validaciones `onInput` y verifica las credenciales contra los usuarios guardados en las cookies. Muestra un modal en caso de error e incluye botones para navegar a recuperación de contraseña o registro.

### Register.js


El componente de Registro permite a los usuarios crear una cuenta con validaciones en `onInput` usando Bootstrap. Verifica si el correo ya está registrado y, si no, guarda el nuevo usuario en las cookies. Muestra un modal de éxito o error según sea necesario.

### RecoverPassword.js


El componente de Recuperación de Contraseña permite a los usuarios ingresar su correo para recibir un código de verificación. Simula el envío del código, cambia el botón a "Validar Código", y verifica el código ingresado. Muestra un modal de éxito o error y navega a la sección de cambio de contraseña si el código es correcto.

### ChangePassword.js


El componente de Cambio de Contraseña permite a los usuarios actualizar su contraseña con validaciones en `onInput`. Verifica que la nueva contraseña cumpla con los requisitos y que coincida con la confirmación. Actualiza la contraseña en las cookies y muestra un modal de éxito.

## Utilidades


### cookies.js


Contiene funciones para gestionar los usuarios en las cookies, incluyendo la obtención de usuarios, la actualización de contraseñas y la gestión del usuario actual.

## Instalación


Para instalar las dependencias del proyecto, usa el siguiente comando:
 
    npm install


## Uso


Para iniciar la aplicación en modo de desarrollo, usa:
 
    npm start


La aplicación estará disponible en http://localhost:3000.

# Gracias por leer!