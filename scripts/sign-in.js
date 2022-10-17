const signIn = () => {

    const form = {
        name: document.querySelector('#name'),
        email: document.querySelector('#email'),
        pass: document.querySelector('#pass'),

        submit: document.querySelector('#signin')
    }

    const API_URL = "https://hnktech.herokuapp.com/api/users";

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

                console.log('Usuario creado: ');
                console.log(data);

            })
            .catch((err) => {
                console.log(err);
            })
    })
}

signIn();