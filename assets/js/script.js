// Crear tres funciones, una request , otra getUser y getRepo

const baseUrl = 'https://api.github.com/users';

const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}

const getUser = async () => {
    const url = `${baseUrl}/${users}`;
    return request(url);
}

//pasar como parámetro el nombre de usuario /user , para traer la información del usuario indicado, como: Nombre de usuario,
//login, cantidad de repositorios, localidad, tipo de usuario y avatar.
const getRepo = async () => {
    const url = `${baseUrl}/${users}/repos?page=${pagina}&per_page=${cantidad_repos}`;
    return request(url)
}

const CapturarForm = () => {
    const formulario = document.querySelector('form');
    /* const btnEnviar = document.querySelector('button') */
    formulario.addEventListener('submit', (Event) => {
        const nombreUsuario = document.querySelector('#nombre').value;
        const numeroPagina = document.querySelector('#pagina').value;
        const repoPagina = document.querySelector('#repoPagina').value;  
        const mensajeError = 'El usuario no existe'
        Promise.all([getUser(nombreUsuario), getRepo(nombreUsuario, numeroPagina, repoPagina)])
        .then(resp => {
            const resultados = document.querySelector('#resultados');
            if(resp[0] === null){
                resultados.innerHTML = '';
                throw new Error(mensajeError)
            }
            
        })

    })
}

