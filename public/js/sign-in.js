let sign_in_form = document.getElementById("sign-in-form")

let username = document.getElementById("username")
let password = document.getElementById("password")

let usuarios = JSON.parse(localStorage.getItem("usuarios"))

sign_in_form.addEventListener('submit', event => {
    event.preventDefault()
    event.stopPropagation()

    let nombre_usuario = username.value.toString()
    let contrasena = password.value.toString()

    if (nombre_usuario === '' || nombre_usuario === null) {
        document.getElementById('username-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio</p>`

        setTimeout(function () {
            document.getElementById('username-validation').innerHTML =  ''
        }, 3500)
    } else if (contrasena === '' || contrasena === null) {
        document.getElementById('password-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio</p>`

        setTimeout(function () {
            document.getElementById('password-validation').innerHTML = ''
        }, 3500)
    }else {
        let usuario = usuarios.find(usuario => usuario.username === nombre_usuario)

        if (usuario !== null){
            sessionStorage.setItem("usuario", JSON.stringify(usuario))
            window.location.href='tienda.html'
        } else{

        }
    }
})