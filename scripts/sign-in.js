const signIn = () => {

    const form = {
        name: document.querySelector('#name'),
        email: document.querySelector('#email'),
        pass: document.querySelector('#pass'),

        submit: document.querySelector('#signin')
    }

    const API_URL = "https://hnktechdb.onrender.com/api/users";

    let button = form.submit.addEventListener("click", (e) => {

        e.preventDefault();

        if (form.name.value.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'El nombre es obligatorio',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } else if (form.email.value.length === 0) {
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
                text: 'La contraseña no es valida',
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
                    name: form.name.value,
                    email: form.email.value,
                    pass: form.pass.value
                })
            })
                .then(response => response.json())
                .then(data => {

                    if (data.errors) {
                        console.log(data);
                        Swal.fire({
                            title: 'Error!',
                            text: 'El correo ya esta registrado',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })

                    } else {

                        window.location.href = "login.html";
                    }

                })

        }


    })
}

signIn();