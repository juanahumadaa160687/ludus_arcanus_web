let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm-password')

document.getElementById('sign-up-form').addEventListener('submit', (e) => {
    let contrasena = password.value.toString()
    let confirm_contrasena = confirmPassword.value.toString()

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
        let usuario = JSON.parse(sessionStorage.getItem('usuario'))

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

        let usuarios = JSON.parse(localStorage.getItem('usuarios'))

        usuarios.splice(usuarios.indexOf(usuario.guid), 1)

        usuario.push(user)

        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }
})