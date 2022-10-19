const cargarCarrito = () => {

    const HTMLResponse = document.querySelector('#carrito');
    let template = '';
    let total = 0;
    let carritoAlmacenado = JSON.parse(localStorage.getItem('carrito'))
    let carritoTemplate = document.querySelector('#carritoLleno');

    if (carritoAlmacenado) {

        carritoTemplate.style.display = "block"

        carritoAlmacenado.forEach(product => {

            total += Number(product.prize);

            template = `
              <div class="row mb-3">
                <img class="img-fluid col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2" src="${product.image}"
                  alt="${product.name}">
                <p class="productos text-black fs-5 col">${product.name}</p>
                <p class="col-2 col-sm-3 col-md-1 col-lg-2 col-xl-2">$${product.prize}</p>
              </div>
              `

            HTMLResponse.innerHTML += template;


        });

        HTMLResponse.innerHTML += `
            <div class="row">
                <p class="col">Total</p>
                <p class="col-2 col-sm-3 col-md-1 col-lg-2 col-xl-2">$${total}</p>
            </div>
            `
    } else {
        const HTMLResponseVacio = document.querySelector('#carritoVacio');

        HTMLResponseVacio.innerHTML += '<h3 class="text-center text-primary mb-3">Carrito vacio</h3>'
    }




}

cargarCarrito();