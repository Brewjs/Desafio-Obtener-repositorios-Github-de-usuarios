// Crear tres funciones, una request , otra getUser y getRepo

const baseUrl = 'https://api.github.com/users';


const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}

const getUser = async (usuario) => {
    const url = `${baseUrl}/${usuario}`;
    return request(url);
}

//pasar como parámetro el nombre de usuario /user , para traer la información del usuario indicado
const getRepo = async (usuario, pagina, cantidad_repos) => {
    const url = `${baseUrl}/${usuario}/repos?page=${pagina}&per_page=${cantidad_repos}`;
    return request(url);
}
//Agregar una escucha (addEventListener) al formulario
const formulario = document.querySelector('form');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombreUsuario = document.querySelector('#nombre').value;
    const numeroPagina = document.querySelector('#pagina').value;
    const repoPagina = document.querySelector('#repoPagina').value;
    const mensajeError = `El usuario ${nombreUsuario} no existe`;

    //realizar el llamado a las dos funciones al mismo tiempo que permiten conectarse con la API y traer la información
    Promise.all([getUser(nombreUsuario), getRepo(nombreUsuario, numeroPagina, repoPagina)]).then(resp => {
            const resultados = document.querySelector('#resultados');
            if (resp[0].name === null) {
                throw new Error(mensajeError);
            } else {
                //construccion de la tabla
                resultados.innerHTML = `<table class='container'>
                    <tr>
                        <th>Datos de Usuario</th>
                        <th>Nombre de Repositorios</th>
                    </tr>
                    <tr>
                        <td class='p-4'>
                            <img src=${resp[0].avatar_url} class='avatar'>
                            <p>Nombre de usuario: ${resp[0].name}</p>
                            <p>Nombre de login: ${resp[0].login}</p>
                            <p>Cantidad de Repositorios: ${resp[0].public_repos}</p>
                            <p>Localidad: ${resp[0].location}</p>
                            <p>Tipo de usuario: ${resp[0].type}</p>
                        </td>
                        <td class='p-4' id='columnaDos'>
                        </td>
                    </tr>
                </table>`
                //Ciclo para agregar los datos a la columna dos
                for (let i = 0; i < resp[1].length; i++) { 
                    $('#columnaDos').append(`<a href=${resp[1][i].html_url} target='_blank'>${resp[1][i].name}</a></br>`);
                }
            }
        }) //mensaje de error mostrando un alert
        .catch(err => alert(mensajeError));
})