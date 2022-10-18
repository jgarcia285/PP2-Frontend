const id = sessionStorage.getItem('idUser');

const getUsuario = (id) => {

    fetch(`http://localhost:8080/api/users/${id}`)
        .then(response => response.json())
        .then((data) => {

            let HTMLResponse = document.querySelector('#infoUser');
            sessionStorage.setItem('nameUser', data.name)
            sessionStorage.setItem('emailUser', data.email)

            let nameUser = sessionStorage.getItem('nameUser')
            let emailUser = sessionStorage.getItem('emailUser')

            HTMLResponse.innerHTML += `<li>Nombre: ${nameUser}</li> <li>Correo electronico: ${emailUser}</li>`

        })
}

const editInfoAcc = (id) => {

    const form = {
        name: document.querySelector('#newName'),
        email: document.querySelector('#newEmail'),
        pass: document.querySelector('#newPass'),

        submitName: document.querySelector('#editName'),
        submitEmail: document.querySelector('#editEmail'),
        submitPass: document.querySelector('#editPass'),
    }

    const API_URL = `http://localhost:8080/api/users/${id}`;

    let button = form.submitName.addEventListener("click", (e) => {

        e.preventDefault();

        fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name.value
            })
        })
            .then(response => response.json())
            .then(data => {
                nameUser = sessionStorage.setItem('nameUser', data.user.name)

                getUsuario(id);

                window.location.reload();

            })
            .catch((err) => {
                console.log(err);
            })


    })

    let button2 = form.submitEmail.addEventListener("click", (e) => {

        e.preventDefault();

        fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: form.email.value
            })
        })
            .then(response => response.json())
            .then(data => {
                emailUser = sessionStorage.setItem('emailUser', data.user.email);

                getUsuario(id);

                window.location.reload();

            })
            .catch((err) => {
                console.log(err);

            })
    })

    let button3 = form.submitPass.addEventListener("click", (e) => {

        e.preventDefault();

        fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pass: form.pass.value
            })
        })
            .then(response => response.json())
            .then(data => {
                getUsuario(id);

                window.location.reload();
            })
            .catch((err) => {
                console.log(err);

            })
    })

}

const deleteAcc = () => {

    let submit = document.querySelector('#deleteAcc');

    let button = submit.addEventListener("click", (e) => {

        e.preventDefault();

        fetch(`http://localhost:8080/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch((err) => {
                console.log(err);
            })

        fetch('https://hnktech.herokuapp.com/api/auth/logout')
            .then(response => response.json())

        let autenticated = false;
        sessionStorage.setItem("auth", autenticated);
        window.location.href = "file:///G:/PP/Frontend/index.html";

    })

}

editInfoAcc(id);
getUsuario(id);
deleteAcc();