let products_container = document.getElementById("products-container")

let productos = JSON.parse(localStorage.getItem("productos"))

const category_name = window.location.href.split('/').pop().split('.')[0];

let games = productos.filter(producto => producto.category === category_name)
let store = productos.filter(producto => producto.sale === true)

const currency_format = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP'
})

export function getDetails(guid) {
  let prod_details = productos.find(producto => producto.guid === guid)
  sessionStorage.setItem("details", JSON.stringify(prod_details))
}


if (category_name === 'tienda'){

  products_container.innerHTML = store.map(function (producto){

    if (producto.stock > 10){
      return `
        <div class="card d-flex flex-column">
          <a href="detalle_producto.html?guid=${producto.guid}">
            <img src="img/${producto.category}/${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body text-start">
              <div class="container-stock">
                <span class="badge stock-normal">Quedan ${producto.stock} unidades</span>
              </div>
              <h5 class="card-title">
                ${producto.name}
              </h5>
              <div class="d-flex flex-column mt-2">
                <p class="old-price">${currency_format.format(producto.price)}</p>
                <div class="d-flex justify-content-start align-items-end mb-0">
                  <p class="price">${currency_format.format(producto.price - (producto.price * producto.discount / 100))}</p>
                  <p class="descuento">-${producto.discount}% OFF</p>        
                </div>
              </div>
            </div>
          </a>
        </div>  
      `
    }else if (producto.stock < 10 && producto.stock > 0){
      return `
        <div class="card d-flex flex-column">
          <a href="detalle_producto.html?guid=${producto.guid}">
            <img src="img/${producto.category}/${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body text-start">
              <div class="container-stock">
                <span class="badge stock-bajo">Quedan ${producto.stock} unidades</span>
              </div>
              <h5 class="card-title">
                ${producto.name}
              </h5>
              <div class="d-flex flex-column mt-2">
                <p class="old-price">${currency_format.format(producto.price)}</p>
                <div class="d-flex justify-content-start align-items-end mb-0">
                  <p class="price">${currency_format.format(producto.price - (producto.price * producto.discount / 100))}</p>
                  <p class="descuento">-${producto.discount}% OFF</p>        
                </div>
              </div>
            </div>
          </a>
        </div>  
      `
    }else{
      return `
        <div class="card d-flex flex-column">
          <a href="detalle_producto.html?guid=${producto.guid}">
            <img src="img/${producto.category}/${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body text-start">
              <div class="container-stock">
                <span class="badge sin-stock">Sin stock disponible</span>
              </div>
              <h5 class="card-title">
                ${producto.name}
              </h5>
              <div class="d-flex flex-column mt-2">
                <p class="price">${currency_format.format(producto.price)}</p>
              </div>
            </div>
          </a>
        </div>  
      `
    }

  }).join("")

} else{
  products_container.innerHTML = games.map(function(producto) {
    if (producto.stock === 0){
      return `
        <div class="card d-flex flex-column">
          <a href="detalle_producto.html?guid=${producto.guid}">
            <img src="img/${producto.category}/${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body text-start">
              <div class="container-stock">
                <span class="badge sin-stock">Sin stock</span>
              </div>
              <h5 class="card-title">
                ${producto.name}
              </h5>
              <div class="d-flex flex-column mt-2">
                <p class="price">${currency_format.format(producto.price)}</p>   
              </div>
            </div>
          </a>
        </div>
      `
    }else if (producto.stock < 10 && producto.stock > 0 && producto.sale){
      return `
        <div class="card d-flex flex-column">
          <a href="detalle_producto.html?guid=${producto.guid}">
            <img src="img/${producto.category}/${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body text-start">
              <div class="container-stock">
                <span class="badge stock-bajo">Quedan ${producto.stock} unidades</span>
              </div>
              <h5 class="card-title">
                ${producto.name}
              </h5>
              <div class="d-flex flex-column mt-2">
                <p class="old-price">${currency_format.format(producto.price)}</p>
                <div class="d-flex justify-content-start align-items-end mb-0">
                  <p class="price">${currency_format.format(producto.price - (producto.price * producto.discount / 100))}</p>
                  <p class="descuento">-${producto.discount}% OFF</p>        
                </div>
              </div>
            </div>
          </a>
        </div>
      `
    }else if (producto.stock < 10 && producto.stock > 0 && !producto.sale) {
      return `
        <div class="card d-flex flex-column">
          <a href="detalle_producto.html?guid=${producto.guid}">
            <img src="img/${producto.category}/${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body text-start">
              <div class="container-stock">
                <span class="badge stock-bajo">Quedan ${producto.stock} unidades</span>
              </div>
              <h5 class="card-title">
                ${producto.name}
              </h5>
              <div class="d-flex flex-column mt-2">
                <p class="price">${currency_format.format(producto.price)}</p>
              </div>
            </div>
          </a>
        </div>
      `
    }else if (producto.stock > 10 && producto.sale){
      return `
        <div class="card d-flex flex-column">
          <a href="detalle_producto.html?guid=${producto.guid}">
            <img src="img/${producto.category}/${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body text-start">
              <div class="container-stock">
                <span class="badge stock-normal">Quedan ${producto.stock} unidades</span>
              </div>
              <h5 class="card-title">
                ${producto.name}
              </h5>
              <div class="d-flex flex-column mt-2">
                <p class="old-price">${currency_format.format(producto.price)}</p>
                <div class="d-flex justify-content-start align-items-end mb-0">
                  <p class="price">${currency_format.format(producto.price - (producto.price * producto.discount / 100))}</p>
                  <p class="descuento">-${producto.discount}% OFF</p>        
                </div>
              </div>
            </div>
          </a>
        </div>
      `
    }else if (producto.stock > 10 && !producto.sale) {
      return `
        <div class="card d-flex flex-column">
          <a href="detalle_producto.html?guid=${producto.guid}">
            <img src="img/${producto.category}/${producto.image}" alt="${producto.name}" class="card-img-top">
            <div class="card-body text-start">
              <div class="container-stock">
                <span class="badge stock-normal">Quedan ${producto.stock} unidades</span>
              </div>
              <h5 class="card-title">
                ${producto.name}
              </h5>
              <div class="d-flex flex-column mt-2">
                <p class="price">${currency_format.format(producto.price)}</p>
              </div>
            </div>
          </a>
        </div>
      `
    }
  }).join("")

}
