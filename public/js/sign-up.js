import * as bootstrap from "https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/js/bootstrap.bundle.min.js";
import {createAvatar} from "./avatar_creator.js";

/* Determinar formato y fecha actual para determinar la fecha máxima seleccionable */
//Se selecciona el input de la fecha de nacimiento.
const birthday_input = document.getElementById("birthday")

//Se hacen las modificaciones para cambiar el formato de la fecha
const datepicker = new bootstrap.Datepicker( birthday_input, {
    dateFormat: {day: 'numeric', month: 'numeric', year: 'numeric'},
})

/* Creación de Usuario con Validación de Datos */

//Se seleccionan los inputs del formulario
let name = document.getElementById('name');
let lastName = document.getElementById('lastname');
let address = document.getElementById('address');
let username = document.getElementById("username");
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm-password')
let stepper_1 = document.getElementById("stepper-cuenta")
let stepper_2 = document.getElementById("stepper-usuario")
let stepper_3 = document.getElementById("stepper-final")


/*
       * Para cada input se realiza una validación para determinar si el campo esta vacío o no.
       *
       * Además, el input de correo revisa si el correo ingresado es válido.
       *
       * El input de fecha de nacimiento valida si la edad del usuario es mayor que 13 años (resta entre el año actual y el de nacimiento)
       *
       * El input de password valida si el password cumple con los criterios definidos y si coincide con el input de confirmar password.
       *
       * Cada input muestra un mensaje según el error detectado.
       *
       * El mensaje se muestra por 3.5 segundos.
       *
       *
*/

let correo = "";
let user_name = "";
let pass = "";

const form1 = document.getElementById("sign-up-form1")
    form1.addEventListener("submit", event =>{
        event.preventDefault()
        event.stopPropagation()

        let nombre_usuario = username.value.toString()
        let mail = email.value.toString()
        let contrasena = password.value.toString()
        let confirm_contrasena = confirmPassword.value.toString()

        if (mail === '' || mail == null) {
            document.getElementById('email-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio</p>`

            setTimeout(function () {
                document.getElementById('email-validation').innerHTML = ''
            }, 3500)
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            document.getElementById('email-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Ingresa un correo electrónico válido</p>`

            setTimeout(function () {
                document.getElementById('email-validation').innerHTML = ''
            }, 3500)
        } else if (nombre_usuario === '' || nombre_usuario == null) {
            document.getElementById('username-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio</p>`

            setTimeout(function () {
                document.getElementById('username-validation').innerHTML = ''
            }, 3500)
        }else if (contrasena === '' || contrasena == null) {
            document.getElementById('password-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio</p>`

            setTimeout(function () {
                document.getElementById('password-validation').innerHTML = ''
            }, 3500)
        } else if (contrasena.length < 8 || contrasena.length > 18) {
            document.getElementById('password-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> La contraseña debe tener entre 8 y 18 caracteres</p>`

            setTimeout(function () {
                document.getElementById('password-validation').innerHTML = ''
            }, 3500)
        } else if (!/[A-Z]/.test(contrasena) || !/[a-z]/.test(contrasena) || !/[0-9]/.test(contrasena) || !/[!@#$%&*?]/.test(contrasena)) {
            document.getElementById('password-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> La debe tener al menos 1 mayúscula, 1 minúscula, un dígito y un símbolo (!@#$%&*?)</p>`

            setTimeout(function () {
                document.getElementById('password-validation').innerHTML = ''
            }, 3500)
        } else if (confirm_contrasena !== contrasena) {
            document.getElementById('confirm-password-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Las contraseñas no coinciden</p>`

            setTimeout(function () {
                document.getElementById('confirm-password-validation').innerHTML = ''
            }, 3500)
        }else{

            correo = mail
            pass = password
            user_name = nombre_usuario

            stepper_2.classList.add("active")
            form1.classList.add("d-none")
            form2.classList.remove("d-none")

        }
    })

const form2 = document.getElementById("sign-up-form2")
    form2.addEventListener("submit", event => {
        event.preventDefault()
        event.stopPropagation()

        let nombre = name.value.toString()
        let apellido = lastName.value.toString()
        let direccion = address.value.toString()
        let edad = birthday_input.value.toString()

        if (nombre === '' || nombre == null) {
            document.getElementById('name-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio</p>`

            setTimeout(function () {
                document.getElementById('name-validation').innerHTML = ''
            }, 3500)
        } else if (apellido === '' || apellido == null) {
            document.getElementById('lastname-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio</p>`

            setTimeout(function () {
                document.getElementById('lastname-validation').innerHTML = ''
            }, 3500)
        } else if (edad === '' || edad == null) {
            document.getElementById('birthday-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio</p>`

            setTimeout(function () {
                document.getElementById('birthday-validation').innerHTML = ''
            }, 3500)
        } else if (new Date().getFullYear() - new Date(edad).getFullYear() <= 13) {
            document.getElementById('birthday-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Tienes que ser mayor de 13 años para registrarte</p>`

            setTimeout(function () {
                document.getElementById('birthday-validation').innerHTML = ''
            }, 3500)
        }else {
            //Se genera el avatar del usuario y se guarda con los demás datos.
            let user_avatar = createAvatar();

            let guid = crypto.randomUUID()

            let user = {
                "guid": guid,
                "first_name": nombre,
                "last_name": apellido,
                "birthday": edad,
                "email": correo,
                "username": user_name,
                "address": direccion,
                "password": pass,
                "avatar": user_avatar,
                "role": "usuario"
            }

            let usuarios = JSON.parse(localStorage.getItem("usuarios"))

            usuarios.add(user)

            localStorage.setItem("usuarios", JSON.stringify(usuarios))

            stepper_3.classList.add("active")

            let bienvenida = document.getElementById("final_bienvenida")
            bienvenida.innerHTML = `<p class="text-center">Bienvenido <strong>${nombre} ${apellido}</strong> a la comunidad de Ludus Arcanus, ya puedes iniciar sesión.</p>`

        }
    })