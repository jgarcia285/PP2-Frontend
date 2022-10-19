const render = () => {

    const loginNavbar = document.getElementById("navbar01").style;
    const welcomeNavbar = document.getElementById("navbar02").style;
    let autenticated = sessionStorage.getItem("auth");

    if (autenticated === null) {
        loginNavbar.display = "initial";
        welcomeNavbar.display = "none";
        sessionStorage.setItem("auth", false);
    }

    if (autenticated === "false" || autenticated === null) {
        //Logica si el usuario esta logeado
        loginNavbar.display = "initial";
        welcomeNavbar.display = "none";

    } else {
        //Logica si el usuario no esta logeado
        loginNavbar.display = "none";
        welcomeNavbar.display = "initial";
    }

    const validateAuth = () => {
        if (autenticated === "false" || autenticated === null) {
            //Logica si el usuario esta logeado
            loginNavbar.display = "initial";
            welcomeNavbar.display = "none";

        } else {
            //Logica si el usuario no esta logeado
            loginNavbar.display = "none";
            welcomeNavbar.display = "initial";
        }
    }


    validateAuth();

}

render();