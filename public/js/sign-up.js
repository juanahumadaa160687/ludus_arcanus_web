import * as bootstrap from "https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/js/bootstrap.bundle.min.js";
import * as avatarCreator from "./avatar_creator.js";
import {createAvatar} from "./avatar_creator.js";

const alert_placeholder = document.getElementById("alert")

const append_alert = (message, type) => {
    const container = document.createElement("div")
    container.innerHTML = `<div class="alert theme-${type}" role="alert" id="alert-container"><i class="bi bi-check2-circle"></i> <p>${message}</p><button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Cerrar"></button></div>`

    alert_placeholder.append(container)
}

append_alert('Usuario creado con éxito', 'success')

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

//Se selecciona el formulario de registro
const form = document.getElementById("sign-up-form")

if (form) {
    //Se agrega un listener para el envío del formulario (submit)
    form.addEventListener("submit", event => {
        event.preventDefault()
        event.stopPropagation()

        //Se transforman los valores de los inputs a string
        let nombre = name.value.toString()
        let apellido = lastName.value.toString()
        let direccion = address.value.toString()
        let nombre_usuario = username.value.toString()
        let mail = email.value.toString()
        let contrasena = password.value.toString()
        let edad = birthday_input.value.toString()
        let confirm_contrasena = confirmPassword.value.toString()


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
        * */
        if (nombre === '' || nombre == null) {
            document.getElementById('name-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio`
            name.classList.add("is-invalid")

            setTimeout(function () {
                name.classList.remove('is-invalid')
            }, 3500)
        } else if (apellido === '' || apellido == null) {
            document.getElementById('lastname-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio`
            lastName.classList.add('is-invalid')

            setTimeout(function () {
                lastName.classList.remove('is-invalid')
            }, 3500)
        } else if (nombre_usuario === '' || nombre_usuario == null) {
            document.getElementById('username-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio`
            username.classList.add('is-invalid')

            setTimeout(function () {
                username.classList.remove('is-invalid')
            }, 3500)
        } else if (mail === '' || mail == null) {
            document.getElementById('email-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio`
            email.classList.add('is-invalid')

            setTimeout(function () {
                email.classList.remove('is-invalid')
            }, 3500)
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            document.getElementById('email-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> Ingresa un correo electrónico válido`
            email.classList.add('is-invalid')

            setTimeout(function () {
                email.classList.remove('is-invalid')
            }, 3500)
        } else if (edad === '' || edad == null) {
            document.getElementById('birthday-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio`
            birthday_input.classList.add('is-invalid')

            setTimeout(function () {
                birthday_input.classList.remove('is-invalid')
            }, 3500)
        } else if (new Date().getFullYear() - new Date(edad).getFullYear() <= 13) {
            document.getElementById('birthday-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> Tienes que ser mayor de 13 años para registrarte`
            birthday_input.classList.add('is-invalid')

            setTimeout(function () {
                birthday_input.classList.remove('is-invalid')
            }, 3500)
        } else if (contrasena === '' || contrasena == null) {
            document.getElementById('password-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio`
            password.classList.add('is-invalid')

            setTimeout(function () {
                password.classList.remove('is-invalid')
            }, 3500)
        } else if (contrasena.length < 8 || contrasena.length > 18) {
            document.getElementById('password-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> La contraseña debe tener entre 8 y 18 caracteres`
            password.classList.add('is-invalid')

            setTimeout(function () {
                password.classList.remove('is-invalid')
            }, 3500)
        } else if (!/[A-Z]/.test(contrasena) || !/[a-z]/.test(contrasena) || !/[0-9]/.test(contrasena) || !/[!@#$%&*?]/.test(contrasena)) {
            document.getElementById('password-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> La debe tener al menos 1 mayúscula, 1 minúscula, un dígito y un símbolo (!@#$%&*?)`
            password.classList.add('is-invalid')

            setTimeout(function () {
                password.classList.remove('is-invalid')
            }, 3500)
        } else if (confirm_contrasena !== contrasena) {
            document.getElementById('confirm-password-validation').innerHTML = `<i class="bi bi-exclamation-triangle"></i> Las contraseñas no coinciden`
            confirmPassword.classList.add('is-invalid')

            setTimeout(function () {
                confirmPassword.classList.remove('is-invalid')
            }, 3500)
        } else {
            //Se genera el avatar del usuario y se guarda con los demás datos.
            let user_avatar = createAvatar();

            let guid = crypto.randomUUID()

            let user = {
                guid: guid,
                first_name: nombre,
                last_name: apellido,
                birthday: edad,
                email: mail,
                username: nombre_usuario,
                address: direccion,
                password: contrasena,
                avatar: user_avatar,
                role: "usuario"
            }

            let usuarios = JSON.parse(localStorage.getItem("usuarios"))

            usuarios.add(user)

            localStorage.setItem("usuarios", JSON.stringify(usuarios))

            append_alert('Usuario creado con éxito', 'success')
        }
    })
}