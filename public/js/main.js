//Get year for copyright
const year = new Date().getFullYear();

function setCopyrightYear() {
    const copyrightYear = document.getElementById("copyright-year");
    if (copyrightYear) {
        copyrightYear.innerText = `© ${year} - Ludus Arcanus. Todos los derechos reservados.`;
    }
}
setCopyrightYear();

//Add active class to the current button (highlight it)
const link = window.location.href.split('/').pop().split('.')[0];

const links = ["index", "juegos-mesa", "juegos-cartas", "juegos-rol", "accesorios", "terminos", "privacidad", "condiciones_envio", "sign-in", "sign-up", "carrito", "user-profile"];

function setActiveLink() {

    for (let i = 0; i < links.length; i++) {

        if (link === links[i]) {

            const activeLink = document.querySelector(`a[class="nav-link"][href="${links[i]}.html"]`);

            const footerLink = document.querySelector(`a[class="footer-link"][href="${links[i]}.html"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
            if (footerLink) {
                footerLink.classList.add("active");
            }
        }
        else if (link === "juegos-mesa" || link === "juegos-cartas" || link === "juegos-rol" || link === "accesorios") {
            const tiendaLink = document.getElementById("dropdownMenuButton");
            const tiendaTextLabel = document.getElementById("dropdownMenuLabel");
            tiendaLink.classList.add("active");
            tiendaTextLabel.style.color = "#FFF";
        }
    }
}

setActiveLink();

//Modificar navbar con usuario conectado
let user_avatar = document.getElementById('user-avatar')
let logout = document.getElementById('log-out')
let sign_in = document.getElementById('log-in')
let sign_up = document.getElementById('sign-up')
let carro_compras = document.getElementById("shopping-cart")

let carrito = JSON.parse(sessionStorage.getItem("carrito"))

if (carrito === null){
    carrito = []
}

if (carrito.length > 0){
    carro_compras.classList.remove('d-none')
}

let usuario = JSON.parse(sessionStorage.getItem('usuario'))

if (usuario !== undefined || true){
    user_avatar.innerHTML = `<a class="nav-link" aria-current="page" href="user-profile.html"><span class="avatar"><img class="avatar-img" src="${usuario.avatar_img}" alt="avatar del usuario"></span> ${usuario.first_name + ' ' + usuario.last_name}</a>`
    user_avatar.classList.remove('d-none')
    logout.innerHTML = `<a class="nav-link" aria-current="page" href="" id="logout-link">Cerrar Sesión</a>`
    logout.classList.remove('d-none')
    sign_in.classList.add('d-none')
    sign_up.classList.add('d-none')
}

let logout_link = document.getElementById('logout-link')
logout_link.addEventListener('click', function (){
    sessionStorage.clear()
    user_avatar.classList.add('d-none')
    logout.classList.add('d-none')
    sign_in.classList.remove('d-none')
    sign_up.classList.remove('d-none')

})