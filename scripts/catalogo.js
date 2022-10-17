const cargarDatos = async () => {

    const HTMLResponse = document.querySelector('#catalogue');

    try {

        fetch("https://hnktech.herokuapp.com/api/products")
            .then(response => response.json())
            .then((res) => {
                const template = res.products.map((product) =>
                (`<span class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3" id='${product.category.name}'>
                        <div class="card border-2 text-black">
                            <a href="#" class="productos">
                                <div>${product.name}</div>
                                <div>$${product.prize}</div>
                                <div>Stock: ${product.stock}</div>
                                <div><img src="${product.img}" class="img-fluid" alt="${product.name}"></img></div>
                            </a>
                            <button type="button" class="btn btn-outline-primary">Agregar al carrito</button>
                        </div>
                    </span>
                    `))

                HTMLResponse.innerHTML += template.join('');

            })

    } catch (err) {
        console.log(err);
    }

}

const filtrarCategoria = (c) => {
    let contenedor = document.querySelector('#catalogue');
    let productos = contenedor.querySelectorAll('span');
    let i;

    for (i = 0; i < productos.length; i++) {
        if (productos[i].id === c || c === "all") {
            productos[i].style.display = "initial";
        } else {
            productos[i].style.display = "none";
        }
    }

}

const mostrarTodo = () => {
    let contenedor = document.querySelector('#catalogue');
    let productos = contenedor.querySelectorAll('span');
    let i;

    for (i = 0; i < productos.length; i++) {
        productos[i].style.display = "initial"
    }

}

cargarDatos();