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
                            <button type="button" class="btn btn-outline-primary">Editar informacion</button>
                            <button type="button" class="btn btn-outline-primary">Agregar imagen</button>
                        </div>
                    </span>
                    `))

                    HTMLResponse.innerHTML += template.join('');

                })
        } else {

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
        }

    } catch (err) {
        console.log(err);
    }

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
                (`  <button type="button" class="btn btn-outline-primary" id='${category.name}' onclick="filtrarCategoria('${category.name}')">
                        ${capitalizar(category.name)}
                    </button>
                    `))

                HTMLResponse.innerHTML += template.join('');

                document.querySelector('#TODOS').style.display = "initial";

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

        console.log(jwt)

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

                console.log('Categoria agregada: ');
                console.log(name.value)
                console.log(data);

            })
            .catch((err) => {
                console.log(err);
            })
    })


}

cargarDatos();
cargarCategorias();
agregarProducto();
agregarCategoria();