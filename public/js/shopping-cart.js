const currency_format = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
})

let usuario = JSON.parse(sessionStorage.getItem("usuario"))

let container_address = document.getElementById("container-address")
let container_name = document.getElementById("container-name")

if (usuario !== null && usuario.address !== ''){
    container_name.innerHTML = `
        <label for="name">Nombre</label>
        <input type="text" id="name" class="form-control" value="${usuario.first_name + ' ' + usuario.last_name}" readonly>
    `
    container_address.innerHTML = `
        <label for="address">Dirección</label>
        <input type="text" id="address" class="form-control" value="${usuario.address}" readonly>
    `
} else {
    container_name.innerHTML = `
        <label for="name">Nombre</label>
        <input type="text" id="name" class="form-control" >
    `

    container_address.innerHTML = `
        <label for="address">Dirección</label>
        <input type="text" id="address" class="form-control" >
    `
}

let menu_regiones = document.getElementById("select-region")
let menu_comuna = document.getElementById("select-comuna")

let regiones = JSON.parse(localStorage.getItem("regiones"))

menu_regiones.innerHTML = regiones.map(region => {
    return `
       <option value="${region.region}">${region.region}</option>
    `
}).join('')


document.getElementById("select-region").addEventListener("change", function (e){

    let region = regiones.filter(region => region.region === e.target.value)

    let comunas = region.map(reg => {
        return reg.comunas
    })

    let comuna_selected = comunas[0]

menu_comuna.innerHTML = comuna_selected.map(function(currentValue) {
       return `
         <option value="${currentValue}">${currentValue}</option>
        `
    })

})

let items = JSON.parse(sessionStorage.getItem("carrito"))

let item_container = document.getElementById("item-container")

let precio_total = 0
for(let item in items){
    let precio_descuento = items[item].precio_producto - items[item].precio_producto * items[item].descuento_producto/100
    precio_total = precio_descuento ++
}
console.log(precio_total)

item_container.innerHTML = items.map(item => {
    return `
      <li class="list-group-item d-flex justify-content-start align-items-center">
        <img class="rounded-circle me-2" src="img/${item.categoria_producto}/${item.imagen_producto}" alt="">
        <div class="d-flex justify-content-between align-items-center w-100 m-0 p-0">
          <p class="m-0">${item.nombre_producto}</p>
          <p class="m-0">${currency_format.format(item.precio_producto - item.precio_producto * item.descuento_producto/100)}</p>
        </div>
       </li>
    `
})

let subtotal = document.getElementById("subtotal")

subtotal.innerHTML = `
    <td>Subtotal</td>
    <td class="d-flex justify-content-end">${currency_format.format(precio_total)}</td>
`
let valor = 0

const radios = document.querySelectorAll('input[name=opcion]')

radios.forEach(radio => {
    radio.addEventListener('change', (e) => {

        let envio = document.getElementById('envio')

        if (e.target.value === 'bluexpress'){
            valor = 9000
            envio.innerHTML = `<td>Envío</td><td class="d-flex justify-content-end">${currency_format.format(valor)}</td>`
        }else if (e.target.value === 'chilexpress'){
            valor = 10500
            envio.innerHTML = `<td>Envío</td><td class="d-flex justify-content-end">${currency_format.format(valor)}</td>`
        }else if (e.target.value === 'starken'){
            valor = 7500
            envio.innerHTML = `<td>Envío</td><td class="d-flex justify-content-end">${currency_format.format(valor)}</td>`
        }else if (e.target.value === 'retiro'){
            valor = 0
            envio.innerHTML = `<td>Envío</td><td class="d-flex justify-content-end">${currency_format.format(valor)}</td>`
        }

        let total_container = document.getElementById('total')

        total_container.innerHTML = `
            <td>Total</td>
            <td class="d-flex justify-content-end">${currency_format.format(precio + valor)}</td>
        `

    })
})

const radio_pago = document.querySelectorAll('input[name=radio]')

radio_pago.forEach(pago => {
    pago.addEventListener('change', (e) =>{

        if (e.target.value === 'webpay'){
            let button_pay = document.getElementById("button-pay")
            button_pay.innerHTML = `<button class="cta-button" onclick="window.location.href=''">Pagar</button>`
        } else if (e.target.value === 'transferencia'){
            let button_pay = document.getElementById("button-pay")
            button_pay.innerHTML = `<button class="cta-button" onclick="window.location.href=''">Pagar</button>`
        }

    })
})