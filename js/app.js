// variables
const resultado =  document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')



// al cargar la pagina

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e) {
    e.preventDefault();

    const termino =  document.querySelector('#termino_busqueda').value;
    if( termino === ''){
        //console.log('esta vacio');
        mostrarAlerta('Debe ingresar un texto porfavor');
        return
    }

    buscarImagenes(termino)
    
}

validarFormulario.reset()
async function buscarImagenes(textTeermino) {
    const key = '14579818-2a56fc55e57ab8ce02c21aef8'    
    const url = `https://pixabay.com/api/?key=${key}&q=${textTeermino}&per_page=20`        

    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        //console.log(resultado.hits);
        mostrarImagenes(resultado.hits)
    } catch (error) {
        console.log(error);
    }
}

function mostrarImagenes(imgHits) {
    console.log(imgHits);
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
    imgHits.forEach(imgApi => {
        const { views, likes, tags, user, webformatURL } = imgApi
        resultado.innerHTML += `
    <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
       
    <article class="overflow-hidden rounded-lg shadow-lg">

    <a href="#">
        <img alt="Placeholder" class="block h-auto w-full" src=${ webformatURL }>
    </a>

    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 class="text-lg">
            <a class="no-underline hover:underline text-black" href="#">
                ${ tags } 
            </a>
        </h1>
    </header>

    <div class="col-start-1 row-start-2 px-4">
    <div class="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
      <svg width="20" height="20" fill="currentColor" class="text-violet-600">
        <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
      </svg>
      <div class="ml-1">
        <span class="text-black">${ likes }</span>
      </div>
      <div class="text-base font-normal mx-2">Views</div>
      <div>${ views }</div>
    </div>

    <footer class="flex items-center justify-between leading-none p-2 md:p-4">
        <a class="flex items-center no-underline hover:underline text-black" href="#">
            <img alt="Placeholder" class="block rounded-full" src="https://picsum.photos/32/32/?random">
            <p class="ml-2 text-sm">
                ${ user }
            </p>
        </a>
        <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
            <span class="hidden">Like</span>
            <i class="fa fa-heart"></i>
        </a>
    </footer>

</article>

    </div>
       
        `
    })

    
}

function mostrarAlerta(msg) {
    
    const existeAlerta = document.querySelector('.alertaError')
    if(!existeAlerta){
        const alerta = document.createElement('div')
    
        alerta.classList.add('alertaError')
        alerta.innerHTML = `<p>${msg}</p>`
         setTimeout(() => {
             alerta.remove()
         }, 2000);
    
        formulario.appendChild(alerta)
    }
   
}