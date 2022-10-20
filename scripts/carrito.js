let total = 0;

const cargarCarrito = () => {

  const HTMLResponse = document.querySelector('#carrito');
  let template = '';
  let i = 1;
  let carritoAlmacenado = JSON.parse(localStorage.getItem('carrito'))
  let carritoTemplate = document.querySelector('#carritoLleno');

  if (carritoAlmacenado && carritoAlmacenado.length > 0) {

    carritoTemplate.style.display = "block"

    carritoAlmacenado.forEach(product => {

      total += Number(product.prize);

      template = `
              <div class="row mb-3">
                <div class="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2">
                  <img class="img-fluid" src="${product.image}" data-id="${i}"
                  alt="${product.name}">
                  <button class="w-100 btn btn-danger botonRojo mt-2" data-id="${i}" onclick="eliminarProdCarrito('${i}', '${product.name}')" type="button">Eliminar</button>
                </div>
                  <p class="productos text-black fs-5 col">${product.name}</p>
                  <p class="col-2 col-sm-3 col-md-1 col-lg-2 col-xl-2">$${product.prize}</p>
              </div>
              `

      HTMLResponse.innerHTML += template;

      i++;


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

const eliminarProdCarrito = (id, n) => {

  let carritoAlmacenado = JSON.parse(localStorage.getItem('carrito'));
  let contenedor = document.querySelector('#carrito');
  let botones = contenedor.querySelectorAll('div div button')

  botones.forEach(element => {

    if (element.dataset.id === id) {

      carritoAlmacenado.forEach(product => {

        if (product.name === n) {

          let index = carritoAlmacenado.indexOf(carritoAlmacenado[id - 1]);

          if (index > -1) {
            carritoAlmacenado.splice(index, 1);
          }

          localStorage.setItem('carrito', JSON.stringify(carritoAlmacenado));

          window.location.reload();

        }

      })

    }

  })


}

cargarCarrito();