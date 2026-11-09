let usuario = JSON.parse(sessionStorage.getItem('usuario'))

let user_profile = document.getElementById('user-profile')

user_profile.innerHTML = `
    <div class="card" style="width: 25rem;">
      <div class="card-body">
        <img src="${usuario.avatar_img}" class="card-img rounded-circle" alt="">
        <h5 class="mt-4 mb-0 card-title">${usuario.first_name + ' ' + usuario.last_name}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Email: ${usuario.email}</li>
        <li class="list-group-item">Username: ${usuario.username}</li>
        <li class="list-group-item">Fecha de Nacimiento: ${usuario.birthday}</li>
        <li class="list-group-item">Dirección de Despacho: ${usuario.address}</li>
      </ul>
      <div class="card-body">
        <button class="btn-solid theme-danger w-100" id="btn-eliminar">Eliminar Cuenta</button>
      </div>
    </div>
`
document.getElementById('btn-eliminar').addEventListener('click', (e) => {
    e.preventDefault()
    sessionStorage.clear()
    window.location.href='index.html'
})

let name = document.getElementById('name');
let lastName = document.getElementById('lastname');
let address = document.getElementById('address');
let username = document.getElementById("username");
let email = document.getElementById('email');
let birthday = document.getElementById('birthday')

name.setAttribute('value', usuario.first_name)
lastName.setAttribute('value', usuario.last_name)
address.setAttribute('value', usuario.address)
username.setAttribute('value', usuario.username)
email.setAttribute('value', usuario.email)
birthday.setAttribute('value', usuario.birthday)

document.getElementById('edit-user-form').addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()

    let nombre = name.value.toString()
    let apellido = lastName.value.toString()
    let direccion = address.value.toString()
    let user_name = username.value.toString()
    let mail = email.value.toString()
    let fNacimiento = birthday.value.toString()

    console.log(apellido)

    let user = {
        "first_name": nombre,
        "last_name": apellido,
        "address": direccion,
        "username": user_name,
        "email": mail,
        "birthday": fNacimiento,
        "password": usuario.password,
        "role": "usuario",
        "avatar_img": usuario.avatar_img
    }

    sessionStorage.setItem('usuario', JSON.stringify(user))

    window.location.reload()
})