const login = () => {

    const form = {
        email: document.querySelector('#email'),
        pass: document.querySelector('#pass'),
        submit: document.querySelector('#login')
    }

    const API_URL = "http://localhost:8080/api/auth/login";

    let button = form.submit.addEventListener("click", (e) => {

        e.preventDefault();

        if (form.email.value.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'El correo es obligatorio',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } else if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(form.email.value)) {
            Swal.fire({
                title: 'Error!',
                text: 'El correo no es valido',
                icon: 'error',
                confirmButtonText: 'Ok'
            })

        } else if (form.pass.value.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'La contraseña es obligatoria',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } else {

            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: form.email.value,
                    pass: form.pass.value
                })
            })
                .then(response => response.json())
                .then(data => {

                    if (data.msg) {

                        if (data.msg === 'El correo no existe') {
                            Swal.fire({
                                title: 'Error!',
                                text: 'El correo no esta registrado',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Datos incorrectos',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                        }

                    } else {

                        const roleUser = data.user.role
                        const jwt = data.token;

                        sessionStorage.setItem("jwt", jwt);
                        sessionStorage.setItem("rol", roleUser);
                        sessionStorage.setItem("nameUser", data.user.name);
                        sessionStorage.setItem("emailUser", data.user.email);
                        sessionStorage.setItem("idUser", data.user.uid);

                        autenticated = true;
                        sessionStorage.setItem("auth", autenticated);

                        window.location.href = "file:///G:/PP/Frontend/index.html"
                    }

                })

        }


    })


}

login();
