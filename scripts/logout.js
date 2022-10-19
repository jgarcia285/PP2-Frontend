const logout = () => {

    const form = {
        submit: document.querySelector('#logout')
    }

    const API_URL = "https://hnktech.herokuapp.com/api/auth/logout";

    let button = form.submit.addEventListener("click", (e) => {

        e.preventDefault();

        fetch(API_URL)
            .then(response => response.json())

        let autenticated = false;
        sessionStorage.setItem("auth", autenticated);
        localStorage.clear('carrito');
        window.location.href = "file:///G:/PP/Frontend/index.html"
    })

}

logout();