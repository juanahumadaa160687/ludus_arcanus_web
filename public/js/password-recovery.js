let usuarios = JSON.parse(localStorage.getItem('usuarios'))

document.getElementById('password-recovery-form').addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()

    let email = document.getElementById('email').value.toString()

    console.log(email);

    if (email === '' || email == null) {
        document.getElementById('email-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Este campo es obligatorio</p>`

        setTimeout(function () {
            document.getElementById('email-validation').innerHTML = ''
        }, 3500)
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> Ingresa un correo electrónico válido</p>`

        setTimeout(function () {
            document.getElementById('email-validation').innerHTML = ''
        }, 3500)
    } else{
        let email_user = usuarios.find(usuario => usuario.email === email)

        console.log(email_user)

        if(email_user === undefined){
            document.getElementById('email-validation').innerHTML = `<p><i class="bi bi-exclamation-triangle"></i> El correo electrónico ingresado no existe</p>`

            setTimeout(function () {
                document.getElementById('email-validation').innerHTML = ``
            }, 3500)
        }else{

            sessionStorage.setItem('email_user', email_user.email)

            window.location.href='reset-password.html'
        }
    }
})