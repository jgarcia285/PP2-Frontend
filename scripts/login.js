const login = () => {

    const form = {
        email: document.querySelector('#email'),
        pass: document.querySelector('#pass'),
        submit: document.querySelector('#login')
    }

    const API_URL = "https://hnktech.herokuapp.com/api/auth/login";

    let button = form.submit.addEventListener("click", (e) => {

        e.preventDefault();

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

            })
            .catch((err) => {
                console.log(err);
            })

    })


}

login();
