const logout = () => {

    const form = {
        submit: document.querySelector('#logout')
    }

    const API_URL = "https://hnktechdb.onrender.com/api/auth/logout";

    let button = form.submit.addEventListener("click", (e) => {

        e.preventDefault();

        fetch(API_URL)
            .then(response => response.json())

        let autenticated = false;
        sessionStorage.setItem("auth", autenticated);
        sessionStorage.setItem("rol", 'USER_ROLE')
        localStorage.clear("carrito");
        window.location.href = "index.html"
    })

}

logout();