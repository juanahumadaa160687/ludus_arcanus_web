const currency_format = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
})

const params = new URLSearchParams(window.location.search)

const guid_producto = params.get("guid")

const productos = JSON.parse(localStorage.getItem("productos"))

let detalle_producto = productos.find(producto => producto.guid === guid_producto)

const img_container = document.getElementById("img-container")
const prod_title = document.getElementById("title")
const precios_prod = document.getElementById("prices")
const precio_cuota = document.getElementById("cuotas")
const desc_prod = document.getElementById("description")
const stock_prod = document.getElementById("stock")
const buttons_container = document.getElementById("buttons-container")

img_container.innerHTML = `<img class="img-fluid" id="imagen" src="img/${detalle_producto.category}/${detalle_producto.image}" alt="${detalle_producto.name}">`

prod_title.innerHTML = `<h5>${detalle_producto.name}</h5>`

if (detalle_producto.sale){
    precios_prod.innerHTML = `
                  <p class="old-price">${currency_format.format(detalle_producto.price)}</p>
                  <div id="price-container">
                    <p class="price">${currency_format.format(detalle_producto.price - (detalle_producto.price * detalle_producto.discount / 100))}</p>
                    <p class="descuento">-${detalle_producto.discount}% OFF</p>
                  </div>
              `
} else{
    `<p class="price">${currency_format.format(detalle_producto.price)}</p>`
}

precio_cuota.innerHTML = `<p>6 cuotas de ${currency_format.format((detalle_producto.price - (detalle_producto.price * detalle_producto.discount / 100))/6)} sin interés</p>`

desc_prod.innerHTML = `<p>${detalle_producto.description}</p>`

if (detalle_producto.stock === 0){
    stock_prod.innerHTML = `<p>Sin stock disponible</p>`
    buttons_container.innerHTML = `<button class="disabled-button" id=""><i class="bi bi-cart4"></i> Agregar al carrito</button>`
}else if (detalle_producto.stock === 1)  {
    stock_prod.innerHTML = `<p>Stock disponible: ${detalle_producto.stock} unidad</p>`
    buttons_container.innerHTML = `<button class="cart-button" id="carrito"><i class="bi bi-cart4"></i> Agregar al carrito</button>`
}else {
    stock_prod.innerHTML = `<p>Stock disponible: ${detalle_producto.stock} unidades</p>`
    buttons_container.innerHTML = `<button class="cart-button" id="carrito"><i class="bi bi-cart4"></i> Agregar al carrito</button>`
}

let cart_button = document.getElementById("carrito")




cart_button.addEventListener('click', function (){

    let item = {
        guid_producto: detalle_producto.guid,
        nombre_producto: detalle_producto.name,
        imagen_producto: detalle_producto.image,
        categoria_producto: detalle_producto.category,
        precio_producto: detalle_producto.price,
        descuento_producto: detalle_producto.discount
    }

    let items = JSON.parse(sessionStorage.getItem('carrito'))

    if (items === null){
        items = []
    }

    items.push(item)

    sessionStorage.setItem('carrito', JSON.stringify(items))

    window.location.reload()
})