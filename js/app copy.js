const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')
    // 14579818-2a56fc55e57ab8ce02c21aef8

const registroPorPagina = 40 // osea seran 40 imagenes por pagina
let totalPaginas // se crea esta varible para que al totalizar cada busqueda sea mas rapida
let iterador;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;
    console.log(terminoBusqueda);
    if (terminoBusqueda === '') {
        mostrarAlerta(' Por favor, agregue una busqueda');
        return;
    }

    // buscar imagenes
    buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {

    const alertaPrevia = document.querySelector('.bg-red-100')

    if (!alertaPrevia) {
        const alerta = document.createElement('p')
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
            'max-w-lg', 'mx-auto', 'mt-6', 'text-center')

        alerta.innerHTML = `
        <strong class="font-bold">Error...!</strong>
        <span class="block sm:inline"> ${mensaje}</span>
        `;

        formulario.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 2000);
    }

}

/*
function buscarImagenes(termino) {
    const key = '14579818-2a56fc55e57ab8ce02c21aef8'
        // const url = `https://pixabay.com/api/?key=14579818-2a56fc55e57ab8ce02c21aef8&q=yellow+flowers&image_type=photo`
        //     const url = `https://pixabay.com/api/?key=${key}&q=${termino}`
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=40`
        // una forma de probar la url obtenido es mostrando en consola y luego acceder a esa url 
        // console.log(url);
    fetch(url)
        .then(respuesta => {
            console.log(respuesta);
            return respuesta.json()
        })
        .then(resultado => {
            console.log(resultado);
            totalPaginas = calcularPaginas(resultado.totalHits)
            console.log(totalPaginas);
            mostrarResultado(resultado.hits)
        })
}

*/

// ASYNC AWAIT

async function buscarImagenes(termino) {
    const key = '14579818-2a56fc55e57ab8ce02c21aef8'    
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=40`        
    /*
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {
        totalPaginas = calcularPaginas(resultado.totalHits)
        mostrarResultado(resultado.hits)
    }) */

   try {
    const repuesta = await fetch(url)
    const resultado = await repuesta.json()
    totalPaginas = calcularPaginas(resultado.totalHits)
        mostrarResultado(resultado.hits)
   } catch (error) {
       console.log(error);
   }

}
// FIN ASYNC AWAIT




// creamos la funcion para calcular las imagenes que se cargaran por pagina, luego una vez creado esta funcion se agega al .then resultado
function calcularPaginas(total) {
    return parseInt(Math.ceil(total / registroPorPagina))
}

// crear el generador
function *crearPaginador(total){
    for(let i = 1; i <= total; i++){
        console.log(i);
        yield i // para registrar los valores internamentes
    }
}

function mostrarResultado(resultadoImg) {
    // console.log(resultadoImg);

    // eliminar las busquedas anteriors
    // while (resultado.firstChild) {
    //     resultado.removeChild(resultado.firstChild)
    // }
    eliminarDuplicidad()

    
    // iteramos el arreglo de imagenes y creamos el html
    resultadoImg.forEach(imagen => {
        const { previewURL, views, likes, largeImageURL } = imagen

        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src=${previewURL}>
                
                <div class="p-4">
                    <p class="font-bold">${likes}<span>Me gusta</span></p>
                    <p class="font-bold">${views}<span>Veces vista</span></p>
                    <a class="w-full bg-blue hover:bg-blue-500 uppercase font-bold" href="${largeImageURL}" target="_blank" rel="noopener noreferrer"> Ver imagen</a>
                </div>
            </div>
        </div>
      
        `
    })

    imprimirPaginador();
}

function imprimirPaginador() {
    iteradorPaginas = crearPaginador(totalPaginas)
}

function eliminarDuplicidad() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}
// https://www.youtube.com/watch?v=uGv9GU5RHhY



