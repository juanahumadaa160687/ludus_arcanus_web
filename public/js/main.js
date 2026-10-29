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

const links = ["index", "juegos-mesa", "juegos-cartas", "juegos-rol", "accesorios", "terminos", "privacidad", "condiciones_envio", "sign-in", "sign-up", "carrito", "user-profile", "detalle_producto", "preventas", "ofertas"];

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



