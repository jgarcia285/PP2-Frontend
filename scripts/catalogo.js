const cargarDatos = async () => {

    const HTMLResponse = document.querySelector('#catalogue');

    try {

        let rolAlmacenado = sessionStorage.getItem("rol");

        if (rolAlmacenado === null) {
            sessionStorage.setItem("rol", 'USER_ROLE');
        }

        if (rolAlmacenado === 'ADMIN_ROLE') {

            document.querySelector('#addNewProductButton').style.display = 'initial';
            document.querySelector('#addNewCategoryButton').style.display = 'initial';
            document.querySelector('#deleteCategoryButton').style.display = 'initial';

            fetch("https://hnktech.herokuapp.com/api/products")
                .then(response => response.json())
                .then((res) => {
                    const template = res.products.map((product) =>
                    (`
                    <span class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3" id='${product.category.name}' data-id='${product._id}' data-name='${product.name}'>
                        <div class="card border-2 text-black">
                            <a href="#" class="productos">
                                <div>${product.name}</div>
                                <div>$${product.prize}</div>
                                <div>Stock: ${product.stock}</div>
                                <div><img src="${product.img}" class="img-fluid" alt="${product.name}"></img></div>
                            </a>
                            <button data-bs-toggle="collapse" data-bs-target="#editInfoCollapse" class="btn btn-outline-primary" id="editInfoProd">Editar informacion</button>
                            <button data-bs-toggle="collapse" data-bs-target="#changeImageCollapse" class="btn btn-outline-primary" id="addImageProd">Agregar imagen</button>

                            <div id="editInfoCollapse" class="collapse">
                                <form id="editInfoProdForm" method="put">

                                <div class="form-floating mb-3 d-flex">
                                    <input type="text" class="form-control" id="newNameProd${product._id}" name="newNameProd" placeholder="Nombre">
                                    <label for="newNameProd">Nombre</label>
                                    <button class="w-50 btn btn-lg btn-primary" id="editNameProd${product._id}" type="button" onclick="editarInfo('${product.name}')">Editar</button>
                                </div>

                                <div class="form-floating mb-3 d-flex">
                                    <input type="number" class="form-control" id="newPrizeProd${product._id}" name="newPrizeProd" placeholder="Precio">
                                    <label for="newPrizeProd">Precio</label>
                                    <button class="w-50 btn btn-lg btn-primary" id="editPrizeProd${product._id}" type="button" onclick="editarInfo('${product.name}')">Editar</button>
                                </div>

                                <div class="form-floating mb-3 d-flex">
                                    <input type="number" class="form-control" id="newStockProd${product._id}" name="newStockProd" placeholder="Stock">
                                    <label for="newStockProd">Stock</label>
                                    <button class="w-50 btn btn-lg btn-primary" id="editStockProd${product._id}" type="button" onclick="editarInfo('${product.name}')">Editar</button>
                                </div>

                                </form>
                            </div>

                            <div id="changeImageCollapse" class="collapse">
                                <form id="changeImageForm" method="put">
                                    <div class="m-3">
                                        <label for="changeImageProd" class="form-label">Elegir imagen</label>
                                        <input class="form-control mb-2" type="file" id="changeImageProd${product._id}" name="changeImageProd">
                                        <button class="w-75 btn btn-lg btn-primary" id="changeImage${product._id}" type="button" onclick="cambiarImagen('${product.name}')">Subir imagen</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </span>
                    `)
                    )

                    HTMLResponse.innerHTML += template.join('');

                })
        } else {

            let i = 1;

            fetch("https://hnktech.herokuapp.com/api/products")
                .then(response => response.json())
                .then((res) => {
                    const template = res.products.map((product) =>
                    (`<span class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3" id='${product.category.name}' data-id="${i}">
                        <div class="card border-2 text-black">
                            <a href="#" class="productos">
                                <div id="nameProd" data-info="${product.name}">${product.name}</div>
                                <div id="prizeProd" data-info="${product.prize}">$${product.prize}</div>
                                <div id="stockProd" data-info="${product.stock}">Stock: ${product.stock}</div>
                                <div id="imageProd" data-info="${product.img}"><img src="${product.img}" class="img-fluid" alt="${product.name}"></img></div>
                            </a>
                            <button type="button" class="btn btn-outline-primary" id="${i}" onclick="agregarCarrito(${i++})">Agregar al carrito</button>
                        </div>
                    </span>
                    `))

                    HTMLResponse.innerHTML += template.join('');

                })
        }

    } catch (err) {
        console.log(err);
    }

}

const agregarCarrito = (id) => {

    let contenedor = document.querySelector('#catalogue');
    let botones = contenedor.querySelectorAll('span div button')
    let productos = contenedor.querySelectorAll('span')

    botones.forEach(element => {

        if (Number(element.id) === id) {

            productos.forEach(product => {
                if (Number(product.dataset.id) === id) {

                    let name = product.querySelector('div a div#nameProd').dataset.info;
                    let prize = product.querySelector('div a div#prizeProd').dataset.info;
                    let stock = product.querySelector('div a div#stockProd').dataset.info;
                    let image = product.querySelector('div a div#imageProd').dataset.info;

                    let carrito = {
                        name: name,
                        prize: prize,
                        stock: stock,
                        image: image
                    }

                    let carritoArr = []
                    let repetido = false;

                    if (!localStorage.getItem('carrito')) {
                        carritoArr.push(carrito);
                        localStorage.setItem('carrito', JSON.stringify(carritoArr));
                    } else {

                        carritoArr = JSON.parse(localStorage.getItem('carrito'));

                        carritoArr.forEach(element => {

                            if (element.name === carrito.name) {
                                repetido = true;
                            }

                        });

                        if (!repetido) {
                            carritoArr.push(carrito);
                            localStorage.setItem('carrito', JSON.stringify(carritoArr));
                        } else {
                            console.log('Ese producto ya se encuentra en el carrito');
                        }

                    }

                }
            })
        }

    })


}

const editarInfo = (n) => {

    let contenedor = document.querySelector('#catalogue');
    let productos = contenedor.querySelectorAll('span')

    productos.forEach(element => {
        if (element.dataset.name === n) {

            let id = element.dataset.id;
            let editarNombre = document.querySelector(`#editNameProd${id}`)
            let editarPrecio = document.querySelector(`#editPrizeProd${id}`)
            let editarStock = document.querySelector(`#editStockProd${id}`)

            editarNombre.addEventListener('click', editarNombreProd);
            editarNombre.myParamId = id;

            editarPrecio.addEventListener('click', editarPrecioProd);
            editarPrecio.myParamId = id;

            editarStock.addEventListener('click', editarStockProd);
            editarStock.myParamId = id;

        }
    });
}

const editarNombreProd = (id) => {

    id = id.currentTarget.myParamId
    let name = document.querySelector(`#newNameProd${id}`);
    const jwt = sessionStorage.getItem('jwt');

    fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            xtoken: jwt
        },
        body: JSON.stringify({
            name: name.value.toUpperCase()
        })
    })
        .then(response => response.json())
        .then(data => {

            window.location.href = "file:///G:/PP/Frontend/templates/catalogo.html"

        })
        .catch((err) => {
            console.log(err);

        })


}

const editarPrecioProd = (id) => {

    id = id.currentTarget.myParamId
    let prize = document.querySelector(`#newPrizeProd${id}`);
    const jwt = sessionStorage.getItem('jwt');

    fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            xtoken: jwt
        },
        body: JSON.stringify({
            prize: prize.value
        })
    })
        .then(response => response.json())
        .then(data => {

            window.location.href = "file:///G:/PP/Frontend/templates/catalogo.html"

        })
        .catch((err) => {
            console.log(err);

        })


}

const editarStockProd = (id) => {

    id = id.currentTarget.myParamId
    let stock = document.querySelector(`#newStockProd${id}`);
    const jwt = sessionStorage.getItem('jwt');

    fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            xtoken: jwt
        },
        body: JSON.stringify({
            stock: stock.value
        })
    })
        .then(response => response.json())
        .then(data => {

            window.location.href = "file:///G:/PP/Frontend/templates/catalogo.html"

        })
        .catch((err) => {
            console.log(err);

        })

}

const cambiarImagen = (n) => {

    let contenedor = document.querySelector('#catalogue');
    let productos = contenedor.querySelectorAll('span')

    productos.forEach(element => {
        if (element.dataset.name === n) {

            const jwt = sessionStorage.getItem('jwt');
            let id = element.dataset.id;
            let changeImageButton = document.querySelector(`#changeImage${id}`)
            let newImageData = document.querySelector(`#changeImageProd${id}`)
            let data = new FormData();
            data.append('archivo', newImageData.files[0])

            let API_URL = `http://localhost:8080/api/uploads/products/${id}`

            changeImageButton.addEventListener('click',

                fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        xtoken: jwt
                    },
                    body: data
                })
                    .then(response => response.json())
                    .then(data => {

                        window.location.href = "file:///G:/PP/Frontend/templates/catalogo.html"

                    })
                    .catch((err) => {
                        console.log(err);

                    })

            )

            /*
            if(changeImageButton.value){
                console.log(API_URL)
            } else {
                console.log('nao nao manito')
            }
            */

        }
    });
}

const capitalizar = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const cargarCategorias = async () => {

    const HTMLResponse = document.querySelector('#categories');

    try {

        fetch("https://hnktech.herokuapp.com/api/category")
            .then(response => response.json())
            .then((res) => {
                const template = res.categories.map((category) =>
                (`  <button type="button" class="btn btn-outline-primary" id='${category.name}' data-id='${category.uid}' onclick="filtrarCategoria('${category.name}')">
                        ${capitalizar(category.name)}
                    </button>
                    `))

                HTMLResponse.innerHTML += template.join('');

                document.querySelector('#TODOS').style.display = "initial"

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

const agregarProducto = () => {
    const form = {
        name: document.querySelector('#nameProduct'),
        prize: document.querySelector('#prize'),
        category: document.querySelector('#category'),
        stock: document.querySelector('#stock'),

        submit: document.querySelector('#addProduct')
    }

    const API_URL = "http://localhost:8080/api/products";

    let button = form.submit.addEventListener("click", (e) => {

        e.preventDefault();

        const jwt = sessionStorage.getItem('jwt');

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                xtoken: jwt
            },
            body: JSON.stringify({
                name: form.name.value,
                prize: form.prize.value,
                category: form.category.value,
                stock: form.stock.value,
                img: 'https://res.cloudinary.com/dkfd0chui/image/upload/v1666065995/svmb7pqhbvjkzwkwumch.jpg'
            })
        })
            .then(response => response.json())
            .then(data => {

                window.location.href = "file:///G:/PP/Frontend/templates/catalogo.html"

            })
            .catch((err) => {
                console.log(err);

            })
    })
}

const agregarCategoria = () => {

    const name = document.querySelector('#nameCategory')

    const submit = document.querySelector('#addCategory')

    const API_URL = "https://hnktech.herokuapp.com/api/category";

    let button = submit.addEventListener("click", (e) => {

        e.preventDefault();

        const jwt = sessionStorage.getItem('jwt');

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xtoken': jwt
            },
            body: JSON.stringify({
                name: name.value
            })
        })
            .then(response => response.json())
            .then(data => {

                if (name.value) {
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })

}

const eliminarCategoriaAux = () => {

    let contenedor = document.querySelector('#categories');
    let categorias = contenedor.querySelectorAll('button');
    const categoryToDelete = document.querySelector('#nameCategoryToDelete');
    let n = categoryToDelete.value.toUpperCase()


    categorias.forEach(element => {

        if (element.id === n) {

            let id = element.dataset.id;
            let submit = document.querySelector('#deleteCategory');

            submit.addEventListener('click', eliminarCategoria);
            submit.myParamDelete = id;
        }

    });

}

const eliminarCategoria = (id) => {

    id = id.currentTarget.myParamDelete
    const jwt = sessionStorage.getItem('jwt');

    const API_URL = `http://localhost:8080/api/category/${id}`


    fetch(API_URL, {
        method: 'DELETE',
        headers: {
            xtoken: jwt
        }
    })
        .then(response => response.json())
        .then(() => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })



}


cargarDatos();
cargarCategorias();
agregarProducto();
agregarCategoria();