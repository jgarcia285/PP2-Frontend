let HTMLResponse = document.querySelector('#infoUser');
const nameUser = sessionStorage.getItem('nameUser');
const emailUser = sessionStorage.getItem('emailUser');

HTMLResponse.innerHTML += `<li>Nombre: ${nameUser}</li> <li>Correo electronico: ${emailUser}</li>`