const signIn = () => {

    const form = {
        name: document.querySelector('#name'),
        email: document.querySelector('#email'),
        pass: document.querySelector('#pass'),

        submit: document.querySelector('#signin')
    }

    const API_URL = "http://localhost:8080/api/users";

    let button = form.submit.addEventListener("click", (e) => {

        e.preventDefault();

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

                let error = false;

                console.log(typeof (data));


                if (typeof (data) === 'object') {
                    console.log(data.errors[0].msg)
                    error = true;
                } if (!error) {

                    window.location.href = "file:///G:/PP/Frontend/templates/login.html";

                }

            })
    })
}

signIn();