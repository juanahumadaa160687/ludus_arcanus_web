let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm-password')

document.getElementById('sign-up-form').addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()

    let contrasena = password.value.toString()
    let confirm_contrasena = confirmPassword.value.toString()

    console.log(contrasena)

    if (contrasena === '' || contrasena == null) {
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
        let usuarios = JSON.parse(localStorage.getItem('usuarios'))

        let mail = sessionStorage.getItem('email_user')

        let usuario = usuarios.find(usu => usu.email === mail)

        let user ={
            "guid": usuario.guid,
            "first_name": usuario.first_name,
            "last_name": usuario.last_name,
            "email": usuario.email,
            "username": usuario.username,
            "birthday": usuario.birthday,
            "address": usuario.address,
            "password": contrasena,
            "role": usuario.role,
            "avatar_img": usuario.avatar_img
        }

        let index = usuarios.findIndex(usu => usu.email === mail)

        usuarios.splice(index, 1)

        usuarios.push(user)

        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        window.location.href='sign-in.html'

    }
})